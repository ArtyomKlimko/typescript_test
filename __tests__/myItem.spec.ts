import { MyTree , myItemInterface } from '../src/test';

describe('MyTree', () => {
    let ts: MyTree;
    const items: myItemInterface[] = [
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

    beforeEach(() => {
        ts = new MyTree(items);
    });

    test('getAll() должен возвращать все элементы', () => {
        const allItems = ts.getAll();
        console.log('all',allItems);
        expect(allItems.length).toBe(items.length);
    });

    test('getItem(id) должен возвращать элемент по id', () => {
        const item = ts.getItem(7);
        expect(item).toEqual({ id: 7, parent: 4, type: null });
    });

    test('getChildren(id) должен возвращать дочерние элементы по id', () => {
        const children = ts.getChildren(4);
        expect(children.length).toBe(2);
        expect(children[0].id).toBe(7);
        expect(children[1].id).toBe(8);
    });

    test('getAllChildren(id) должен возвращать всех потомков элемента по id', () => {
        const allChildren = ts.getAllChildren(2);
        expect(allChildren.length).toBe(5);
    });

    test('getAllParents(id) должен возвращать всех родителей элемента по id', () => {
        const allParents = ts.getAllParents(7);
        expect(allParents.length).toBe(3);
    });

    test('getAllParents(id) должен возвращать пустой массив, если элемент не существует', () => {
        const allParents = ts.getAllParents(999);
        expect(allParents.length).toBe(0);
    });
});
