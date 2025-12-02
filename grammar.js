/**
 * @file Veryl
 * @author Mohammedi Mohammed Djawad <djnxur@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'veryl',

  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  rules: {
    source_file: $ => repeat($._item),

    _item: $ => choice(
      $._definition,
      $._statement,
      $._expression,
      $.block,
      $.embedded_code
    ),

    // --- Blocks (Structure) ---
    block: $ => seq(
      '{',
      repeat($._item),
      '}'
    ),

    embedded_code: $ => seq(
      choice('py{{{', 'sv{{{'),
      alias(repeat(choice(/[^}]+/, '}')), $.embedded_content),
      '}}'
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    
    constant_identifier: $ => /[A-Z][0-9A-Z_]+/,

    clock_domain: $ => /`[a-zA-Z_][a-zA-Z0-9_]*/,

    // --- Literals ---
    
    // Strings
    string_literal: $ => seq(
      '"',
      repeat(choice(
        /[^"\\\n]+/,
        /\\./
      )),
      '"'
    ),

    // Numbers (Simplified from Vim regexes to standard TS patterns)
    number_literal: $ => token(choice(
      // Sized hex/bin/oct/dec (e.g., 32'hFF, 1'b1)
      /\d*'[sS]?[bB]\s*[0-1_xXzZ?]+/,
      /\d*'[sS]?[oO]\s*[0-7_xXzZ?]+/,
      /\d*'[sS]?[dD]\s*[0-9_xXzZ?]+/,
      /\d*'[sS]?[hH]\s*[0-9a-fA-F_xXzZ?]+/,
      // Floats and Decimals
      /[0-9_]+(\.[0-9_]*)?([eE][+-]?[0-9_]*)?/,
      // Short literals like '0, 'x
      /'[01xzXZ]/
    )),

    // --- Keywords and Operators ---

    _definition: $ => choice(
      $.keyword_structure,
      $.keyword_type,
      $.keyword_direction
    ),

    _statement: $ => choice(
      $.keyword_statement,
      $.keyword_conditional,
      $.keyword_repeat
    ),

    _expression: $ => choice(
      $.identifier,
      $.constant_identifier,
      $.clock_domain,
      $.string_literal,
      $.number_literal,
      $.operator,
      $.symbol
    ),

    keyword_structure: $ => choice(
      'embed', 'enum', 'function', 'include', 'interface', 
      'modport', 'module', 'package', 'proto', 'pub', 
      'struct', 'union', 'unsafe'
    ),

    keyword_statement: $ => choice(
      'alias', 'always_comb', 'always_ff', 'assign', 'as', 
      'bind', 'connect', 'const', 'final', 'import', 
      'initial', 'inst', 'let', 'param', 'return', 
      'break', 'type', 'var'
    ),

    keyword_type: $ => choice(
      'bit', 'bool', 'clock', 'clock_posedge', 'clock_negedge', 
      'f32', 'f64', 'i8', 'i16', 'i32', 'i64', 'logic', 
      'reset', 'reset_async_high', 'reset_async_low', 
      'reset_sync_high', 'reset_sync_low', 'signed', 
      'string', 'tri', 'u8', 'u16', 'u32', 'u64'
    ),

    keyword_direction: $ => choice(
      'converse', 'inout', 'input', 'output', 'same'
    ),

    keyword_conditional: $ => choice(
      'case', 'default', 'else', 'if_reset', 'if', 
      'inside', 'outside', 'switch'
    ),

    keyword_repeat: $ => choice(
      'for', 'in', 'repeat', 'rev', 'step'
    ),

    // Operators
    operator: $ => choice(
      // Assignment
      '=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=',
      '<<=', '>>=', '<<<', '>>>', '<<<', '>>>',
      // Logic/Math
      '~', '!', '&', '|', '^', '*', '+', '-', '/', '%',
      '<', '>', '<<', '>>', '<:', '>:', '<=', '>=', 
      '==', '!=', '&&', '||', '===', '==?', '!==', '!=?'
    ),

    // Symbols
    symbol: $ => choice(
      '(', ')', '[', ']', ':', ';', ',', '#', '@', '.' 
    ),

    // Comments
    line_comment: $ => token(seq('//', /.*/)),
    block_comment: $ => token(seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'))
  }
});
