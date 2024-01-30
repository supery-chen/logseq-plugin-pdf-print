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

window.print();