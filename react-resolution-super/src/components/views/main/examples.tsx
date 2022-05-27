import React, { FC } from 'react'
import * as ST from './styled'
import Img1 from 'assets/examples/example_2.jpg'
import Img2 from 'assets/examples/example_4.jpg'
import Img3 from 'assets/examples/example_8.jpg'
import { Descriptions } from './texts'
import { useTranslation } from 'react-i18next'

export const Examples: FC = () => {
  const { t } = useTranslation(['main'])
  return (
    <ST.ContainerPhotoBlocks>
      <ST.Photos>
        <ST.BotLinkContainer>
          {t('link')}
          <ST.BotLink href={'asdasdg'} target="_blank">
            {'asdasdg'}
          </ST.BotLink>
        </ST.BotLinkContainer>
        <ST.SectionWrapper>
          <ST.PhotoBlock isLeft={true}>
            <ST.Photo1 src={Img1} />
            <ST.Arrow1 />
          </ST.PhotoBlock>
          <ST.DescriptionText>{t(Descriptions[0].text)}</ST.DescriptionText>
        </ST.SectionWrapper>

        <ST.SectionWrapper>
          <ST.PhotoBlock>
            <ST.Arrow2 />
            <ST.Photo2 src={Img2} />{' '}
          </ST.PhotoBlock>
          <ST.DescriptionText>{t(Descriptions[1].text)}</ST.DescriptionText>
        </ST.SectionWrapper>

        <ST.SectionWrapper>
          <ST.PhotoBlock isLeft={true}>
            <ST.Photo3 src={Img3} />
          </ST.PhotoBlock>
          <ST.DescriptionText>{t(Descriptions[2].text)}</ST.DescriptionText>
        </ST.SectionWrapper>
      </ST.Photos>
    </ST.ContainerPhotoBlocks>
  )
}
