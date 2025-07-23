import React from 'react';
import { 
  Pagination as MuiPagination, 
  Stack,
  Typography
} from '@mui/material';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <Stack spacing={2} alignItems="center" mt={4} mb={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setPage(page)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
      <Typography variant="body2" color="textSecondary">
        Страница {currentPage} из {totalPages}
      </Typography>
    </Stack>
  );
};

export default Pagination;