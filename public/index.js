import "@logseq/libs";

const model = {
  printPdf() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = "window.print({printBackground: true})";
    parent.document.body.appendChild(script);
    parent.document.body.removeChild(script);
  },
};

async function main() {
  fetch('print.css')
    .then(response => response.text())
    .then(cssContent => {
      // console.log(cssContent);
      logseq.provideStyle(cssContent);
      logseq.App.registerUIItem("toolbar", {
        key: `logseq-plugin-pdf-print`,
        template: `<a data-on-click="printPdf" title="PDF" class="button"><i class="ti ti-printer"></i></a>`,
      });
      console.log("#logseq-plugin-pdf-print loaded");
    })
    .catch(error => {
      console.error('#logseq-plugin-pdf-print load error:', error);
    });
}

logseq.ready(model, main).catch(console.error);
