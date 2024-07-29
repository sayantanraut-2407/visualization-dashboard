import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import './DetailsCard.css';

const DetailsCard = (props) => {
  return (
    <Card className='card-style'>
      <CardContent>
        <Typography variant="h5" component="div">
          Plot Details
        </Typography>
        <br/>
        <Typography variant="body" color="text.secondary">
          This section lists the details of the data visualized on the adjacent plot.
        </Typography>
        <List className="bulleted-list">
          <ListItem>
            <ListItemText primary={props.message.id1} />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.message.id2} />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.message.id3} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
