import React, { useState } from 'react'
import * as ST from './styled'

export const AboutApi = () => {
  return (
    <ST.Container>
      <ST.Header>
        <ST.HeaderText>Super Resolution API Documentation</ST.HeaderText>
      </ST.Header>
      <ST.Wrapper>
        <ST.CodePart>
          <ST.CodeHeader>Super Resolution cURL Example</ST.CodeHeader>
          <ST.CodeBlock>
            <ST.Code>
              <ST.GreyCode>
                # You can paste img URL or local image file in 'image' field:
              </ST.GreyCode>
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
          <ST.CodeHeader>Super Resolution Python Example</ST.CodeHeader>
          <ST.CodeBlock>
            <ST.Code>
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
