import React, { useState } from 'react'
import * as ST from './styled'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const AboutApi = () => {
  const { t } = useTranslation(['api'])
  return (
    <ST.Container>
      <ST.Header>
        <ST.HeaderText>{t('apiDoc')}</ST.HeaderText>
      </ST.Header>
      <ST.Wrapper>
        <ST.CodePart>
          <ST.CodeHeader>{t('header')}</ST.CodeHeader>
          <ST.CodeBlock>
            <ST.Code>
              <ST.GreyCode>
                # {t('getToken')}{' '}
                <NavLink to={'/profile'}>
                  <ST.BlueCode isLink={true}>{t('here')}</ST.BlueCode>
                </NavLink>
                :
              </ST.GreyCode>
              <br />
              <ST.GreyCode># {t('youCan')}</ST.GreyCode>
              <br />
              <br />
              curl --location --request POST 'SITE_LINK/api/uploadFile'
              <ST.BlueCode>\</ST.BlueCode>
              <br /> --header <ST.YellowCode>'apiToken: token'</ST.YellowCode>
              <ST.BlueCode>\</ST.BlueCode> <br /> --form{' '}
              <ST.YellowCode>'image=@"img_url"'</ST.YellowCode>
              <ST.BlueCode>\</ST.BlueCode>
              <br /> --form <ST.YellowCode>'coefficient="4"'</ST.YellowCode>
            </ST.Code>
          </ST.CodeBlock>
        </ST.CodePart>

        <ST.CodePart>
          <ST.CodeHeader>{t('python')}</ST.CodeHeader>
          <ST.CodeBlock>
            <ST.Code>
              <ST.GreyCode>
                # {t('getToken')}{' '}
                <NavLink to={'/profile'}>
                  <ST.BlueCode isLink={true}>{t('here')}</ST.BlueCode>
                </NavLink>
                :
              </ST.GreyCode>
              <br />
              <br />
              import requests
              <br />
              <br />
              resp = requests.post(
              <br />
              {'           '}
              <ST.YellowCode>SITE_LINK</ST.YellowCode>,
              <br />
              {'           '}
              <ST.YellowCode>data</ST.YellowCode>={'{'}'coefficient':
              coefficient{'}'},
              <br />
              {'           '}
              <ST.YellowCode>headers</ST.YellowCode>={'{'}'apiToken': token{'}'}
              ,
              <br />
              {'           '}
              <ST.YellowCode>files</ST.YellowCode>={'{'}'image': ('image',
              image_room_file_request, Image.MIME[image.format]){'}'},
              <br />)
              <br />
              <br />
              print(resp.json())
            </ST.Code>
          </ST.CodeBlock>
        </ST.CodePart>
      </ST.Wrapper>
    </ST.Container>
  )
}
