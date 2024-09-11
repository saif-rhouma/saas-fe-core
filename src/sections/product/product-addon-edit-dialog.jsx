import ProductAddonCreateDialog from './product-addon-create-dialog';

const ProductAddonEditDialog = ({ productAddon, open, onClose, handler }) => {
  return (
    <ProductAddonCreateDialog
      productAddon={productAddon}
      open={open}
      onClose={onClose}
      handler={handler}
    />
  );
};
export default ProductAddonEditDialog;
