import React, { FC } from 'react'
import * as ST from './styled'
import Img1 from 'assets/examples/example_2.jpg'
import Img2 from 'assets/examples/example_4.jpg'
import Img3 from 'assets/examples/example_8.jpg'

export const Examples: FC = () => {
  return (
    <ST.ContainerPhotoBlocks>
      <ST.Photos>
        <ST.PhotoBlock isLeft={true}>
          <ST.Photo1 src={Img1} />
          <ST.Arrow1 />
        </ST.PhotoBlock>

        <ST.PhotoBlock>
          <ST.Arrow2 />
          <ST.Photo2 src={Img2} />
        </ST.PhotoBlock>

        <ST.PhotoBlock isLeft={true}>
          <ST.Photo3 src={Img3} />
        </ST.PhotoBlock>
      </ST.Photos>
      <ST.Description>
        <ST.DescriptionText>
          With super resolution powered by deep learning, you can increase the
          resolution of your images 4x without losing rich features.
        </ST.DescriptionText>
      </ST.Description>
    </ST.ContainerPhotoBlocks>
  )
}
