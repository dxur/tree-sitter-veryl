import XCTest
import SwiftTreeSitter
import TreeSitterVeryl

final class TreeSitterVerylTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_veryl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Veryl grammar")
    }
}
