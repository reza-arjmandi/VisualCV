import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Title from './Title';
import Typography from '@mui/material/Typography';
import { CvProcess } from '../../models';

export default function CvProcess({ process }: {process: CvProcess}) {
  const [sliderValues, setSliderValues] = React.useState([...process.configurations]);
  const [imagePath, setImagePath] = React.useState("");
  const [processedImage, setProcessedImage] = React.useState("");

  return (
    <React.Fragment>
      <Stack spacing={4}>
        <TextField id="outlined-basic" label="Image address" variant="outlined" onChange={event => setImagePath(event.target.value)} />

        <Title>Original image</Title>
        <img src={'file:///C://image.jpg'} alt="" width="100%" height="100%" />

        <Title>Processed image</Title>
        <img src={processedImage} alt="" width="100%" height="100%" />

        <Title>Algorithm configurations:</Title>
        {process.configurations.map(config => 
          (     
            <Stack>  
              <Typography id="track-false-slider" gutterBottom>
                {config.title}
              </Typography>
              <Slider
                size="small"
                defaultValue={config.value}
                min={config.min}
                max={config.max}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(event, value, activeThumb) => {
                  const newSliderValues = [...process.configurations];
                  const found = newSliderValues.find(elem => elem.title === config.title);
                  found.value = value as number;
                  setSliderValues(newSliderValues)
                }}
              />
            </Stack>
          ))
        }
        <Button color="secondary" variant='contained' onClick={async () => {
          const newImage = await backend.invokeCvProcess({
            ...process,
            configurations: sliderValues,
            imagePath,
          });
          setProcessedImage(newImage);
        }}>
          Process
        </Button>
      </Stack>
    </React.Fragment>
  );
}