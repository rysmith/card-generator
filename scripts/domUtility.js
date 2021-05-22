var domUtility = (function() {
    'use strict'

    function buildNode(tag, text = '', attributes = []) {
        var node = document.createElement(tag);
        var textNode = document.createTextNode(text);

        node.appendChild(textNode);
        attributes.forEach(function(attribute) {
            node.setAttribute(attribute.key, attribute.value)
        });

        return node
    }

    function buildIcon(style) {
        return buildNode('i', '', [{ key: 'class', value: style }]);
    }

    function appendChildren(element, children) {
        children.forEach(function(child) {
            element.appendChild(child)
        });
    }

    function chunk(array, size) {
        var chunkedArrayTemplate = { length: Math.ceil(array.length / size) }

        return Array.from(chunkedArrayTemplate, function(_, index) {
            var startIndex = index * size;
            var endIndex = index * size + size;

            return array.slice(startIndex, endIndex);
        })
    }

    return {
        buildNode: buildNode,
        buildIcon: buildIcon,
        chunk: chunk,
        appendChildren: appendChildren,
    }
})();