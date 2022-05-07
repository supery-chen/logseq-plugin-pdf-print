import "@logseq/libs";

const model = {
  printPdf() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = "window.print()";
    parent.document.body.appendChild(script);
    parent.document.body.removeChild(script);
  },
};

async function main() {
  logseq.provideStyle(`
  -webkit-print-color-adjust:exact;
  `);
  logseq.provideStyle(`
  @media print {    
    * {
      overflow:visible !important;
    }
    
    div[class^="CodeMirror"] {
      overflow:hidden !important;
    }
    
    .cm-s-light > div > textarea {
      display: none;
    }

    .cm-s-solarized.cm-s-light {
      background-color: #fdf6e3 !important;
    }
    
    .CodeMirror-gutters {
      display:none;
    }

    .CodeMirror-linenumber {
      display:none;
    }
    .CodeMirror-sizer {
      margin-left: 1px !important;
      margin-bottom: 1px !important;
      min-height: 10px !important;
    }
    
    .page {
      page-break-after:always;
    }
    #head {
      display:none;
    }
    #left-sidebar {
      display:none;
    }
    #right-sidebar {
      display:none;
    }
    .references {
      display:none;
    }
    .cp__sidebar-help-btn {
      display:none;
    }
  }
  `);
  logseq.App.registerUIItem("toolbar", {
    key: `logseq-plugin-pdf-print`,
    template: `<a data-on-click="printPdf" title="print pdf" class="button"><i class="ti ti-printer"></i></a>`,
  });

  console.log("#logseq-plugin-pdf-print loaded");
}

logseq.ready(model, main).catch(console.error);
