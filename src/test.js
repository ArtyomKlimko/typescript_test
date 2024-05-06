var myItem = /** @class */ (function () {
    function myItem(items) {
        this.itemsMap = new Map();
        this.childrenMap = new Map();
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.itemsMap.set(item.id, item);
            if (item.parent) {
                var parentId = item.parent;
                if (!this.childrenMap.has(parentId)) {
                    this.childrenMap.set(parentId, []);
                }
                this.childrenMap.get(parentId).push(item);
            }
        }
    }
    myItem.prototype.getAll = function () {
        return Array.from(this.itemsMap.values());
    };
    myItem.prototype.getItem = function (id) {
        return this.itemsMap.get(id);
    };
    myItem.prototype.getChildren = function (id) {
        return this.childrenMap.get(id) || [];
    };
    myItem.prototype.collectAllChildrenRecursively = function (id, result) {
        var children = this.getChildren(id);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            result.push(child);
            this.collectAllChildrenRecursively(child.id, result);
        }
    };
    myItem.prototype.getAllChildren = function (id) {
        var result = [];
        this.collectAllChildrenRecursively(id, result);
        return result;
    };
    myItem.prototype.getAllParents = function (id) {
        var result = [];
        var currentId = id;
        while (currentId !== undefined && this.itemsMap.has(currentId)) {
            var currentItem = this.itemsMap.get(currentId);
            if (currentItem) {
                result.unshift(currentItem);
                currentId = currentItem.parent;
            }
            else {
                break;
            }
        }
        return result;
    };
    return myItem;
}());
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var tree = new myItem(items);
console.log(tree.getAll());
console.log(tree.getItem(2));
console.log(tree.getChildren(1));
console.log(tree.getAllChildren(1));
console.log(tree.getAllParents('abc'));
