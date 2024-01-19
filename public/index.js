import "@logseq/libs";

const scripts = `
function hidePrint(elements, excludeIds) {
  Array.from(elements)
      .forEach(function (element) {
          var childId = element.id;
          if (!excludeIds.includes(childId) && !element.classList.contains('print-hide')) {
              element.classList.add('print-hide')
          }
      });
}

hidePrint(document.querySelector('main').children, ['app-container']);
hidePrint(document.getElementById('app-container').children, ['left-container']);
hidePrint(document.getElementById('left-container').children, ['main-container']);
hidePrint(document.getElementById('main-container').children, ['main-content-container']);

// window.print({ printBackground: true });
window.print();
`

const model = {
  printPdf() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = scripts;
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
