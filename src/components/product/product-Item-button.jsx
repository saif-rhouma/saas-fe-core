import { Box } from '@mui/material';

const ProductItemButton = ({ image, productName }) => {
  const previewUrl = typeof image === 'string' ? image : URL.createObjectURL(image);

  return (
    <Box
      gap={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 3,
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
      }}
    >
      <Box sx={{ display: 'inline-flex', width: 60, height: 60 }}>
        <Box
          component="img"
          src={previewUrl}
          sx={{
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
      </Box>
      {productName && (
        <Box
          component="span"
          sx={{
            height: 24,
            lineHeight: '24px',
            fontSize: (theme) => theme.typography.subtitle2.fontSize,
            fontWeight: (theme) => theme.typography.subtitle2.fontWeight,
          }}
        >
          {productName}
        </Box>
      )}
    </Box>
  );
};
export default ProductItemButton;
