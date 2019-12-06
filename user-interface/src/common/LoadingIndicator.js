/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: October 29, 2019
 * Description: The LoadingIndicator class component is used to create the loading symbol when a page takes
 * time to load
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import { Spin, Icon } from 'antd';

export default function LoadingIndicator(props) {
    const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}
