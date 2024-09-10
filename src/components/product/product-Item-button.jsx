import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProductItemButton = ({ payload, image, productName, handleClick, selected }) => {
  const previewUrl = typeof image === 'string' ? image : URL.createObjectURL(image);
  const theme = useTheme();
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  return (
    <Box
      gap={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: selected ? PRIMARY_MAIN : '',
        p: 3,
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
      }}
      onClick={() => handleClick(payload)}
    >
      <Box sx={{ display: 'inline-flex', width: 65, height: 65 }}>
        <Box
          component="img"
          src={previewUrl}
          sx={{
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: 2,
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
