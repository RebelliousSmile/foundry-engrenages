/**
 * Mode TOML pour CodeMirror
 * Fournit la coloration syntaxique pour les fichiers TOML
 */

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineMode("toml", function() {
    return {
      startState: function() {
        return {
          inString: false,
          stringType: "",
          lhs: true,
          inArray: 0
        };
      },
      
      token: function(stream, state) {
        // Handle whitespace
        if (stream.eatSpace()) {
          return null;
        }
        
        // Handle comments
        if (!state.inString && !state.inArray && stream.match(/#/)) {
          stream.skipToEnd();
          return "comment";
        }
        
        // Handle section headers
        if (!state.inString && !state.inArray && stream.match(/\[\[/) && stream.match(/.*\]\]/, false)) {
          stream.skipTo("]]");
          stream.match(/\]\]/);
          return "header";
        }
        
        if (!state.inString && !state.inArray && stream.match(/\[/) && stream.match(/.*\]/, false)) {
          stream.skipTo("]");
          stream.match(/\]/);
          return "header";
        }
        
        // Handle key-value pairs
        if (!state.inString && !state.inArray && state.lhs && stream.match(/\w+/)) {
          stream.match(/\s*=\s*/, false);
          state.lhs = false;
          return "property";
        }
        
        if (!state.inString && !state.inArray && !state.lhs && stream.match(/=/)) {
          state.lhs = true;
          return "operator";
        }
        
        // Handle strings
        if (!state.inString && !state.inArray && (stream.match('"""') || stream.match("'''"))) {
          state.inString = true;
          state.stringType = stream.match(/"""/) ? '"""' : "'''";
          return "string";
        }
        
        if (!state.inString && !state.inArray && (stream.match('"') || stream.match("'"))) {
          state.inString = true;
          state.stringType = stream.match(/"/) ? '"' : "'";
          return "string";
        }
        
        if (state.inString) {
          var escaped = false;
          
          while (!stream.eol()) {
            var ch = stream.next();
            
            if (ch === '\\') {
              escaped = true;
            } else if (!escaped && 
                      ((state.stringType === '"' && ch === '"') || 
                       (state.stringType === "'" && ch === "'") ||
                       (state.stringType === '"""' && ch === '"' && stream.match(/""/, false)) ||
                       (state.stringType === "'''" && ch === "'" && stream.match(/''/, false)))) {
              if (state.stringType === '"""') {
                stream.match(/""/);
              } else if (state.stringType === "'''") {
                stream.match(/''/);
              }
              state.inString = false;
              state.stringType = "";
              return "string";
            } else {
              escaped = false;
            }
          }
          
          return "string";
        }
        
        // Handle arrays
        if (!state.inString && stream.match(/\[/)) {
          state.inArray++;
          return "bracket";
        }
        
        if (!state.inString && state.inArray && stream.match(/\]/)) {
          state.inArray--;
          return "bracket";
        }
        
        // Handle numbers
        if (!state.inString && stream.match(/\d+(\.\d+)?([eE][+-]?\d+)?/)) {
          return "number";
        }
        
        // Handle booleans
        if (!state.inString && stream.match(/true|false/)) {
          return "atom";
        }
        
        // Handle dates and times
        if (!state.inString && stream.match(/\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?/)) {
          return "variable-2";
        }
        
        // Skip other characters
        stream.next();
        return null;
      },
      
      lineComment: "#"
    };
  });

  CodeMirror.defineMIME("text/x-toml", "toml");
});
