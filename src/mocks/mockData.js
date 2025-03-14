// 테스트용 목 데이터

export const mockCustomerInfo = {
    phoneNumber: "01012345678",
    status: "정상",
    currentProduct: {
      productCode: "BASIC",
      productName: "기본 요금제",
      fee: 35000
    }
  };
  
  export const mockBillingInfo = {
    phoneNumber: "01012345678",
    billingMonth: "202311",
    totalFee: 42500,
    details: [
      {
        itemCode: "BASE",
        itemName: "기본료",
        amount: 35000
      },
      {
        itemCode: "DATA",
        itemName: "데이터 추가 요금",
        amount: 5000
      },
      {
        itemCode: "SMS",
        itemName: "문자 메시지",
        amount: 2500
      }
    ],
    discounts: [
      {
        discountCode: "LOYALTY",
        discountName: "장기 고객 할인",
        amount: 3000
      },
      {
        discountCode: "EVENT",
        discountName: "이벤트 할인",
        amount: 2000
      }
    ],
    deviceInstallment: {
      deviceId: "GALAXY-S21",
      model: "갤럭시 S21",
      amount: 15000,
      remainingMonths: 12
    }
  };
  
  export const mockProductCheckResult = {
    available: true,
    message: "상품 변경이 가능합니다.",
    currentProduct: {
      productCode: "BASIC",
      productName: "기본 요금제",
      fee: 35000
    },
    targetProduct: {
      productCode: "PREMIUM",
      productName: "프리미엄 요금제",
      fee: 55000
    }
  };
  
  export const mockProductChangeResult = {
    success: true,
    message: "상품 변경이 완료되었습니다.",
    transactionId: "TX123456789",
    changeDate: "2023-11-30",
    previousProduct: {
      productCode: "BASIC",
      productName: "기본 요금제"
    },
    newProduct: {
      productCode: "PREMIUM",
      productName: "프리미엄 요금제"
    },
    additionalFee: 10000
  };
  
  // 여러 달의 요금 정보
  export const mockMonthlyBillingInfos = {
    "202301": {
      phoneNumber: "01012345678",
      billingMonth: "202301",
      totalFee: 38000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 },
        { itemCode: "SMS", itemName: "문자 메시지", amount: 3000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: null
    },
    "202302": {
      phoneNumber: "01012345678",
      billingMonth: "202302",
      totalFee: 40000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 },
        { itemCode: "DATA", itemName: "데이터 추가 요금", amount: 5000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: null
    },
    "202303": {
      phoneNumber: "01012345678",
      billingMonth: "202303",
      totalFee: 42000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 },
        { itemCode: "DATA", itemName: "데이터 추가 요금", amount: 7000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: null
    },
    "202304": {
      phoneNumber: "01012345678",
      billingMonth: "202304",
      totalFee: 45000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 },
        { itemCode: "DATA", itemName: "데이터 추가 요금", amount: 7000 },
        { itemCode: "CALL", itemName: "음성통화", amount: 3000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: null
    },
    "202305": {
      phoneNumber: "01012345678",
      billingMonth: "202305",
      totalFee: 85000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 },
        { itemCode: "DATA", itemName: "데이터 추가 요금", amount: 5000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 24
      }
    },
    "202306": {
      phoneNumber: "01012345678",
      billingMonth: "202306",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 23
      }
    },
    "202307": {
      phoneNumber: "01012345678",
      billingMonth: "202307",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 22
      }
    },
    "202308": {
      phoneNumber: "01012345678",
      billingMonth: "202308",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 21
      }
    },
    "202309": {
      phoneNumber: "01012345678",
      billingMonth: "202309",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 20
      }
    },
    "202310": {
      phoneNumber: "01012345678",
      billingMonth: "202310",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 19
      }
    },
    "202311": {
      phoneNumber: "01012345678",
      billingMonth: "202311",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 18
      }
    },
    "202312": {
      phoneNumber: "01012345678",
      billingMonth: "202312",
      totalFee: 80000,
      details: [
        { itemCode: "BASE", itemName: "기본료", amount: 35000 }
      ],
      discounts: [
        { discountCode: "LOYALTY", discountName: "장기 고객 할인", amount: 3000 }
      ],
      deviceInstallment: {
        deviceId: "GALAXY-S21",
        model: "갤럭시 S21",
        amount: 48000,
        remainingMonths: 17
      }
    }
  };