/**
 * CodeMirror pour le système Engrenages
 * Basé sur CodeMirror 5.65.3
 */

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// This is CodeMirror (https://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CodeMirror = factory());
}(this, (function () { 'use strict';

  // Minimal CodeMirror implementation for TOML editing
  // This is a simplified version of CodeMirror for demonstration purposes
  
  function CodeMirror(place, options) {
    if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);
    
    this.options = options || {};
    this.doc = "";
    this.mode = this.options.mode || "text";
    this.lineNumbers = this.options.lineNumbers || false;
    this.theme = this.options.theme || "default";
    
    // Create editor elements
    this.wrapper = document.createElement("div");
    this.wrapper.className = "CodeMirror cm-s-" + this.theme;
    if (this.lineNumbers) this.wrapper.classList.add("CodeMirror-lineNumbers");
    
    this.scroller = document.createElement("div");
    this.scroller.className = "CodeMirror-scroll";
    this.wrapper.appendChild(this.scroller);
    
    this.content = document.createElement("div");
    this.content.className = "CodeMirror-content";
    this.scroller.appendChild(this.content);
    
    this.textarea = document.createElement("textarea");
    this.textarea.className = "CodeMirror-textarea";
    this.textarea.setAttribute("autocorrect", "off");
    this.textarea.setAttribute("autocapitalize", "off");
    this.textarea.setAttribute("spellcheck", "false");
    this.content.appendChild(this.textarea);
    
    // Set initial content
    if (place.value) {
      this.textarea.value = place.value;
      this.doc = place.value;
    }
    
    // Replace the original textarea with our editor
    if (place.nodeName === "TEXTAREA") {
      this.origTextarea = place;
      place.parentNode.insertBefore(this.wrapper, place);
      place.style.display = "none";
    } else {
      place.appendChild(this.wrapper);
    }
    
    // Set up event listeners
    this.textarea.addEventListener("input", () => {
      this.doc = this.textarea.value;
      if (this.origTextarea) this.origTextarea.value = this.doc;
    });
    
    // Apply styles
    this.applyStyles();
  }
  
  CodeMirror.prototype = {
    getValue: function() {
      return this.doc;
    },
    
    setValue: function(value) {
      this.doc = value;
      this.textarea.value = value;
      if (this.origTextarea) this.origTextarea.value = value;
    },
    
    setSize: function(width, height) {
      if (width) this.wrapper.style.width = typeof width === "number" ? width + "px" : width;
      if (height) this.wrapper.style.height = typeof height === "number" ? height + "px" : height;
    },
    
    applyStyles: function() {
      // Basic styles for the editor
      this.wrapper.style.position = "relative";
      this.wrapper.style.border = "1px solid #ddd";
      this.wrapper.style.background = "#f5f5f5";
      this.wrapper.style.fontFamily = "monospace";
      
      this.scroller.style.overflow = "auto";
      this.scroller.style.height = "100%";
      
      this.content.style.padding = "10px";
      
      this.textarea.style.width = "100%";
      this.textarea.style.height = "100%";
      this.textarea.style.border = "none";
      this.textarea.style.background = "transparent";
      this.textarea.style.outline = "none";
      this.textarea.style.resize = "none";
      this.textarea.style.fontFamily = "monospace";
      this.textarea.style.fontSize = "14px";
      this.textarea.style.lineHeight = "1.5";
    }
  };
  
  // Factory method to create an editor from a textarea
  CodeMirror.fromTextArea = function(textarea, options) {
    options = options || {};
    
    // Create a new CodeMirror instance
    var cm = new CodeMirror(textarea, options);
    
    // Save the textarea for later use
    cm.toTextArea = function() {
      if (cm.origTextarea) {
        cm.origTextarea.value = cm.getValue();
        cm.origTextarea.style.display = "";
        cm.wrapper.parentNode.removeChild(cm.wrapper);
      }
    };
    
    return cm;
  };
  
  // Register modes
  CodeMirror.modes = {};
  CodeMirror.defineMode = function(name, mode) {
    CodeMirror.modes[name] = mode;
  };
  
  // Define the TOML mode
  CodeMirror.defineMode("toml", function() {
    return {
      token: function(stream, state) {
        // This is a simplified tokenizer for TOML
        // In a real implementation, this would be more sophisticated
        
        // Handle comments
        if (stream.match(/#/)) {
          stream.skipToEnd();
          return "comment";
        }
        
        // Handle section headers
        if (stream.match(/\[.*\]/)) {
          return "header";
        }
        
        // Handle key-value pairs
        if (stream.match(/\w+\s*=/)) {
          return "keyword";
        }
        
        // Handle strings
        if (stream.match(/"/)) {
          while (!stream.eol()) {
            if (stream.next() === '"' && stream.peek() !== '"') break;
          }
          return "string";
        }
        
        // Handle numbers
        if (stream.match(/\d+/)) {
          return "number";
        }
        
        // Skip other characters
        stream.next();
        return null;
      }
    };
  });
  
  return CodeMirror;
})));
