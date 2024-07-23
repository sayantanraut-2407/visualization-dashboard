import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import './DetailsCard.css';

const DetailsCard = () => {
  return (
    <Card className='card-style'>
      <CardContent>
        <Typography variant="h5" component="div">
          Plot Details
        </Typography>
        <br/>
        <Typography variant="body2" color="text.secondary">
          This section lists the details of the data visualized on the adjacent plot.
        </Typography>
        <List className="bulleted-list">
          <ListItem>
            <ListItemText primary="Details point 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Details point 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Details point 3" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
