import React from 'react';
import { Icon } from '@iconify/react';
import {ThemesColors} from '../CommonStyles';


const ProfitIndicator = ({ profit }) => {
  const icon = profit >= 0 ? "solar:double-alt-arrow-up-bold-duotone" : "solar:double-alt-arrow-down-bold-duotone";
  const color = profit >= 0 ? ThemesColors.tradeSuccessDark : ThemesColors.tradeDangerDark;

  return (
    <Icon
      icon={icon}
      width="24px"
      height="24px"
      color={color}
      style={{ color: color }}
    />
  );
};

export default ProfitIndicator;
