export interface myItemInterface {
    id: number;
    parent: string | number;
    type?: string | null;
}

export class MyTree{
    private itemsMap: Map<string | number, myItemInterface>;
    private childrenMap: Map<string | number, myItemInterface[]>;

    constructor(items: myItemInterface[]) {
        this.itemsMap = new Map();
        this.childrenMap = new Map();

        items.forEach(item =>{
            this.itemsMap.set(item.id, item);
            if (typeof item.parent === 'number') {
                const parentId = item.parent;
                if (!this.childrenMap.has(parentId)) {
                    this.childrenMap.set(parentId, []);
                }
                this.childrenMap.get(parentId)!.push(item);
            }
        })

    }

    getAll(): myItemInterface[] {
        return Array.from(this.itemsMap.values());
    }

    getItem(id: string | number): myItemInterface | undefined {
        return this.itemsMap.get(id);
    }

    getChildren(id: string | number): myItemInterface[] {
        return this.childrenMap.get(id) || [];
    }

    private collectAllChildrenRecursively(id: string | number, result: myItemInterface[]): void {
        const children = this.getChildren(id);
        for (const child of children) {
            result.push(child);
            this.collectAllChildrenRecursively(child.id, result);
        }
    }

    getAllChildren(id: string | number): myItemInterface[] {
        const result: myItemInterface[] = [];
        this.collectAllChildrenRecursively(id, result);
        return result;
    }

    getAllParents(id: string | number): myItemInterface[] {
        const result: myItemInterface[] = [];
        let currentId: string | number | undefined = id;

        while (currentId !== undefined && this.itemsMap.has(currentId)) {
            const currentItem = this.itemsMap.get(currentId);
            if (currentItem) {
                result.unshift(currentItem);
                currentId = currentItem.parent;
            } else {
                break;
            }
        }

        return result;
    }
}


const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
    { id: 9, parent: 4, type: null },

    { id: 10, parent: 8, type: null },
    { id: 12, parent: 10, type: 'test' },
    { id: 15, parent: 10, type: 'test' },
    { id: 14, parent: 10, type: 'test' },

    { id: 18, parent: 12, type: 'test' },
    { id: 20, parent: 12, type: 'test' },
    { id: 19, parent: 12, type: 'test' },

    { id: 22, parent: 15, type: null },
    { id: 25, parent: 15, type: null },
    { id: 27, parent: 15, type: null },

    { id: 31, parent: 14, type: 'test' },
    { id: 33, parent: 14, type: 'test' },
    { id: 35, parent: 14, type: 'test' },

    { id: 40, parent: 18, type: 'test' },
    { id: 45, parent: 18, type: 'test' },
    { id: 50, parent: 18, type: 'test' },

    { id: 60, parent: 19, type: null },
    { id: 65, parent: 19, type: null },
    { id: 70, parent: 19, type: null },

    { id: 80, parent: 22, type: 'test' },
    { id: 85, parent: 22, type: 'test' },
    { id: 90, parent: 22, type: 'test' },

    { id: 100, parent: 25, type: 'test' },
    { id: 105, parent: 25, type: 'test' },
    { id: 110, parent: 25, type: 'test' },

    { id: 120, parent: 27, type: null },
    { id: 125, parent: 27, type: null },
    { id: 130, parent: 27, type: null }
];

const ts = new MyTree(items);

console.log(ts.getAll()) // [{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]

// console.log(ts.getItem(7)) // {"id":7,"parent":4,"type":null}

// console.log(ts.getChildren(4)) // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
// console.log(ts.getChildren(5)) // []
// console.log(ts.getChildren(2)) // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]
// console.log(ts.getAllChildren(2)) // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]

// console.log(ts.getAllParents(7)) // [{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]
