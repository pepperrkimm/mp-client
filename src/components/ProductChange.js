import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import Header from './Header';
import { getCustomerInfo, checkProductChange, changeProduct } from '../services/product';

// 테스트용 상품 코드 목록
const PRODUCT_CODES = ['5GX_STANDARD', '5GX_PREMIUM', 'FAMILY', 'BUSINESS'];

const ProductChange = () => {
  const { phoneNumber } = useParams();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [error, setError] = useState('');
  const [productCheckResult, setProductCheckResult] = useState(null);
  const [changeReason, setChangeReason] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [changeResult, setChangeResult] = useState(null);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomerInfo();
  }, [phoneNumber]);

  const loadCustomerInfo = async () => {
    if (!phoneNumber) return;

    setLoading(true);
    setError('');

    try {
      const response = await getCustomerInfo(phoneNumber);
      setCustomerInfo(response);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        '고객 정보를 불러오는데 실패했습니다.'
      );
      setCustomerInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (event) => {
    setSelectedProduct(event.target.value);
    setProductCheckResult(null);
  };

  const handleCheckProduct = async () => {
    if (!selectedProduct) {
      setError('상품을 선택해주세요.');
      return;
    }

    setCheckLoading(true);
    setError('');

    try {
      const response = await checkProductChange(phoneNumber, selectedProduct);
      setProductCheckResult(response);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        '상품 변경 가능 여부 확인에 실패했습니다.'
      );
      setProductCheckResult(null);
    } finally {
      setCheckLoading(false);
    }
  };

  const handleOpenConfirmDialog = () => {
    if (!changeReason) {
      setError('변경 사유를 입력해주세요.');
      return;
    }
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleChangeProduct = async () => {
    setChangeLoading(true);
    setError('');

    try {
      console.log(phoneNumber, selectedProduct, changeReason);
      const response = await changeProduct(phoneNumber, selectedProduct, changeReason);
      setChangeResult(response);
      setOpenConfirmDialog(false);
      setOpenResultDialog(true);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        '상품 변경에 실패했습니다.'
      );
    } finally {
      setChangeLoading(false);
    }
  };

  const handleCloseResultDialog = () => {
    setOpenResultDialog(false);
    if (changeResult && changeResult.data.success) {
      navigate(`/customer-info`);
    }
  };

  return (
    <div className="app-container">
      <Header title="상품 변경" />
      
      <Container sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h1">
            {phoneNumber} 상품 변경
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : customerInfo ? (
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              현재 사용 중인 상품
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">상품명</Typography>
                  <Typography variant="body1">{customerInfo.data.currentProduct.productName}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">월 요금</Typography>
                  <Typography variant="body1">{customerInfo.data.currentProduct.fee.toLocaleString()}원</Typography>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              변경할 상품 선택
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
              <RadioGroup
                aria-label="product"
                name="product"
                value={selectedProduct}
                onChange={handleProductSelect}
              >
                {PRODUCT_CODES.filter(code => code !== customerInfo.data.currentProduct.productCode).map((code) => (
                  <FormControlLabel
                    key={code}
                    value={code}
                    control={<Radio />}
                    label={code}
                    sx={{ 
                      p: 1, 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 1,
                      mb: 1,
                      width: '100%'
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleCheckProduct}
              disabled={!selectedProduct || checkLoading}
              sx={{ mb: 2 }}
            >
              {checkLoading ? '확인 중...' : '변경 가능 여부 확인'}
            </Button>

            {productCheckResult && (
              <>
                <Alert 
                  severity={productCheckResult.data.available ? "true" : "error"}
                  sx={{ mb: 2 }}
                >
                  {productCheckResult.message}
                </Alert>

                {productCheckResult.data.available && (
                  <>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          변경될 상품 정보
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="textSecondary">상품명</Typography>
                          <Typography variant="body1">{productCheckResult.data.targetProduct.productName}</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="textSecondary">월 요금</Typography>
                          <Typography variant="body1">{productCheckResult.data.targetProduct.fee.toLocaleString()}원</Typography>
                        </Box>
                      </CardContent>
                    </Card>

                    <TextField
                      fullWidth
                      label="변경 사유"
                      multiline
                      rows={3}
                      value={changeReason}
                      onChange={(e) => setChangeReason(e.target.value)}
                      sx={{ mb: 2 }}
                    />

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleOpenConfirmDialog}
                      disabled={!changeReason}
                    >
                      상품 변경하기
                    </Button>
                  </>
                )}
              </>
            )}
          </Paper>
        ) : null}

        {/* 변경 확인 다이얼로그 */}
        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
        >
          <DialogTitle>상품 변경 확인</DialogTitle>
          <DialogContent>
            <DialogContentText>
              상품을 변경하시겠습니까? 변경 후에는 즉시 적용되며, 필요에 따라 일할 계산된 추가 요금이 발생할 수 있습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} disabled={changeLoading}>
              취소
            </Button>
            <Button onClick={handleChangeProduct} color="primary" disabled={changeLoading}>
              {changeLoading ? '처리 중...' : '변경'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 변경 결과 다이얼로그 */}
        <Dialog
          open={openResultDialog}
          onClose={handleCloseResultDialog}
        >
          <DialogTitle>
            {changeResult?.data?.success ? '상품 변경 완료' : '상품 변경 실패'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {changeResult?.data?.message}
              
              {changeResult?.data?.success && (
                <>
                  <br/><br/>
                  이전 상품: {changeResult.data.previousProduct.productName}<br/>
                  변경된 상품: {changeResult.data.newProduct.productName}<br/>
                  {changeResult.data.additionalFee > 0 && (
                    <>추가 요금: {changeResult.data.additionalFee.toLocaleString()}원</>
                  )}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResultDialog} color="primary">
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ProductChange;