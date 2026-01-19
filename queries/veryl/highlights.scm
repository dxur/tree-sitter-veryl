; Keywords
(keyword_structure) @keyword
(keyword_statement) @keyword
(keyword_direction) @keyword
(keyword_conditional) @keyword.control
(keyword_repeat) @keyword.control

; Types
(keyword_type) @type.builtin

; Variables and Constants
(identifier) @variable
(constant_identifier) @constant
(clock_domain) @constant.special

; Literals
(string_literal) @string
(number_literal) @constant.numeric

; Operators & Punctuation
(operator) @operator
(symbol) @punctuation.delimiter
["{" "}"] @punctuation.bracket

; Comments
(line_comment) @comment
(block_comment) @comment

; Embedded Code
(embedded_code) @function.macro
