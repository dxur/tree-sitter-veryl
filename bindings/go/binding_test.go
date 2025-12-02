package tree_sitter_veryl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_veryl "github.com/dxur/tree-sitter-veryl/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_veryl.Language())
	if language == nil {
		t.Errorf("Error loading Veryl grammar")
	}
}
