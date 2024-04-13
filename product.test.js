const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe('Añadir Productos', () => {
    test('debería agregar un producto', () => {
        addProduct('Producto 1', 10);
        expect(getProducts()).toEqual([{ id: 1, name: 'Producto 1', price: 10 }]);
    });

    test('debería incrementar el id en 1 cada vez que se añada un producto', () => {
        addProduct('Producto 1', 10);
        addProduct('Producto 2', 20);
        expect(getProducts()).toHaveLength(2);
        expect(getProducts()[0].id).toBe(1);
        expect(getProducts()[1].id).toBe(2);
    });

    test('debería lanzar un error si el nombre no está definido', () => {
        expect(() => addProduct('', 10)).toThrow('El nombre del producto no está definido');
    });

    test('debería lanzar un error si el precio no está definido', () => {
        expect(() => addProduct('Producto 1', null)).toThrow('El precio del producto no está definido');
    });

    test('debería lanzar un error si el producto ya existe', () => {
        addProduct('Producto 1', 10);
        expect(() => addProduct('Producto 1', 20)).toThrow('El producto ya existe');
    });
});

describe('Eliminar Producto', () => {
    test('debería eliminar un producto', () => {
        addProduct('Producto 1', 10);
        removeProduct(1);
        expect(getProducts()).toHaveLength(0);
    });

    test('debería lanzar un error si el producto no existe', () => {
        expect(() => removeProduct(1)).toThrow('El producto no existe');
    });
});

describe('Obtener Producto', () => {
    test('debería devolver un producto por su id', () => {
        addProduct('Producto 1', 10);
        expect(getProduct(1)).toEqual({ id: 1, name: 'Producto 1', price: 10 });
    });

    test('debería lanzar un error si el producto no existe', () => {
        expect(() => getProduct(1)).toThrow('El producto no existe');
    });
});

describe('Actualizar Producto', () => {
    test('debería actualizar un producto por su id', () => {
        addProduct('Producto 1', 10);
        updateProduct(1, 'Producto Actualizado', 20);
        expect(getProduct(1)).toEqual({ id: 1, name: 'Producto Actualizado', price: 20 });
    });

    test('debería lanzar un error si el producto no existe', () => {
        expect(() => updateProduct(1, 'Producto Actualizado', 20)).toThrow('El producto no existe');
    });
});