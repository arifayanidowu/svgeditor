import React, { useState } from "react";
import {
  Button,
  colors,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Stage, Layer, Rect, Line, Circle } from "react-konva";
import PortalWrapper from "./PortalWrapper";
import { InfoConfig } from '../definitions/Interfaces';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  drawing: {
    width: '100%',
    height: 350,
    background: "#ccc",
    marginBottom: 30,
    position: "relative",
    overflow: 'hidden'
  },
  container: {
    position: "relative",
    padding: theme.spacing(3),
  },
  editor: {
    marginTop: 60,
  },
  info: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    top: '45%',
    left: '50%'
  },
  textGrey: {
    color: colors.grey[500],
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    padding: theme.spacing(1.5),
    width: 200,
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      width: 150,
    },
  },
}));



let info: InfoConfig = {
  fill: "",
  left: 0,
  top: 0,
  width: 100,
  height: 100,
  stroke: "black",
  strokeWidth: 3,
  x: 20,
  y: 20,
  x1: 100,
  y1: 0,
  x2: 100,
  y2: 0,
  radius: 50,
};

export default function Drawing() {
  const classes = useStyles();
  const [rect, setRect] = useState([] as InfoConfig[]);
  const [line, setLine] = useState([] as InfoConfig[]);
  const [circle, setCircle] = useState([] as InfoConfig[]);
  const [isDragging, setDragging] = React.useState(false);

  const handleChange = (i: any, setState: any, shape: any[]) => (e: any) => {
    e.persist();
    const newShape = shape.map((item, index) => {
      if (i !== index) {
        return item;
      }
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
    setState(newShape);
  }

  const addShape = (setState: any): any => {
    setState((prev: any[]) => [...prev, info])
  }

  const deleteShape = (i: number, setState: any) => {
    setState((prev: any[]) => prev.filter((_, index) => index !== i))
  }


  return (
    <div>
      <div className={classes.drawing}>
        {(rect.length || circle.length || line.length) === 0 ? (
          <Typography className={classes.info}>
            Your Drawing is Empty
          </Typography>
        ) : (
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                <PortalWrapper selector=".top-layer" enabled={isDragging}>
                  {rect.map((item, i) => (
                    <Rect
                      key={i}
                      x={item.x}
                      y={item.y}
                      width={item.width}
                      height={item.height}
                      fill={item.fill}
                      stroke={item.stroke}
                      strokeWidth={item.strokeWidth}
                      draggable={true}
                      onDragStart={() => {
                        setDragging(true);
                      }}
                      onDragEnd={() => {
                        setDragging(false);
                      }}
                    />
                  ))}
                </PortalWrapper>
                {circle.map((item, i) => (
                  <Circle
                    key={i}
                    x={item.x}
                    y={item.y}
                    radius={50}
                    fill={item.fill}
                    stroke={item.stroke}
                    strokeWidth={item.strokeWidth}
                    draggable={true}
                    onDragStart={() => {
                      setDragging(true);
                    }}
                    onDragEnd={() => {
                      setDragging(false);
                    }}
                  />
                ))}
                {line.map((item, i) => (
                  <Line
                    key={i}
                    x={item.x}
                    y={item.y}
                    points={[item.x1, item.x2, item.y1, item.y2]}
                    fill={item.fill}
                    stroke={item.stroke}
                    strokeWidth={item.strokeWidth}
                    draggable={true}
                    onDragStart={() => {
                      setDragging(true);
                    }}
                    onDragEnd={() => {
                      setDragging(false);
                    }}
                  />
                ))}
              </Layer>
            </Stage>
          )}
      </div>
      <div className={classes.container}>

        {/* Buttons Start */}
        <Grid container justify="space-between" alignItems="center" >
          <Button
            variant="contained"
            color="primary"
            onClick={() => addShape(setCircle)}
            className={classes.btn}
          >
            Add Circle
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addShape(setRect)}
            className={classes.btn}
          >
            Add Rectangle
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addShape(setLine)}
            className={classes.btn}
          >
            Add Line
          </Button>
        </Grid>

        {/* Buttons End */}

        {/* Shapes */}

        <div className={classes.editor}>
          <Typography variant="h6" component="h1" gutterBottom style={{ marginBottom: 30 }}>
            Shapes
          </Typography>
          {(rect.length || circle.length || line.length) === 0 ? (
            <Typography gutterBottom className={classes.textGrey}>
              You haven't added any shapes yet
            </Typography>
          ) : (
              <>
                {rect.map((item, i) => (
                  <>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      spacing={3}
                      key={i}
                     
                    >
                   
                      <Grid item xs={12} md={11}>
                      <Typography gutterBottom>Rectangle {i + 1}</Typography>

                        <TextField
                          label="Fill Color"
                          name="fill"
                          value={item.fill}

                          onChange={handleChange(i, setRect, rect)}
                          variant="outlined"
                        />
                        <TextField
                          label="Left"
                          type="number"
                          name="x"
                          value={item.x}

                          onChange={handleChange(i, setRect, rect)}
                          variant="outlined"
                        />
                        <TextField
                          label="Top"
                          type="number"
                          name="y"
                          value={item.y}

                          onChange={handleChange(i, setRect, rect)}
                          variant="outlined"
                        />
                        <TextField
                          label="Width"
                          type="number"
                          name="width"
                          value={item.width}

                          onChange={handleChange(i, setRect, rect)}
                          variant="outlined"
                        />
                        <TextField
                          label="Height"
                          type="number"
                          name="height"
                          value={item.height}

                          onChange={handleChange(i, setRect, rect)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <Button variant="text" color="secondary" onClick={() => deleteShape(i, setRect)}>
                          Delete
                      </Button>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </>
                ))}

                {circle.map((item, i) => (
                  <>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      spacing={3}
                      key={i}
                    >
                      
                      <Grid item xs={12} md={11}>
                        <Typography gutterBottom>Circle {i + 1}</Typography>
                        <TextField
                          label="Fill Color"
                          name="fill"
                          value={item.fill}
                          onChange={handleChange(i, setCircle, circle)}

                          variant="outlined"
                        />
                        <TextField
                          label="Left"
                          type="number"
                          name="x"
                          value={item.x}
                          onChange={handleChange(i, setCircle, circle)}
                          variant="outlined"
                        />
                        <TextField
                          label="Top"
                          type="number"
                          name="y"
                          value={item.y}
                          onChange={handleChange(i, setCircle, circle)}
                          variant="outlined"
                        />
                        <TextField
                          label="Radius"
                          type="number"
                          name="radius"
                          value={item.radius}
                          onChange={handleChange(i, setCircle, circle)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <Button variant="text" color="secondary" onClick={() => deleteShape(i, setCircle)}>
                          Delete
                      </Button>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </>
                ))}

                {line.map((item, i) => (
                  <>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      spacing={3}
                      key={i}
                    >
                    
                      <Grid item xs={12} md={11}>
                        <Typography gutterBottom>Line {i + 1}</Typography>
                        <TextField
                          label="Color"
                          name="stroke"
                          value={item.stroke}
                          onChange={handleChange(i, setLine, line)}
                          variant="outlined"
                        />
                        <TextField
                          label="Thickness"
                          type="number"
                          name="strokeWidth"
                          value={item.strokeWidth}
                          onChange={handleChange(i, setLine, line)}
                          variant="outlined"
                        />
                        <TextField
                          label="X1"
                          type="number"
                          name="x1"
                          value={item.x1}
                          onChange={handleChange(i, setLine, line)}
                          variant="outlined"
                        />
                        <TextField
                          label="X2"
                          type="number"
                          name="radius"
                          value={item.x2}
                          onChange={handleChange(i, setLine, line)}
                          variant="outlined"
                        />
                        <TextField
                          label="Y1"
                          type="number"
                          name="y1"
                          value={item.y1}
                          onChange={handleChange(i, setLine, line)}
                          variant="outlined"
                        />
                        <TextField
                          label="Y2"
                          type="number"
                          name="y2"
                          value={item.y2}
                          onChange={handleChange(i, setLine, line)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <Button variant="text" color="secondary" onClick={() => deleteShape(i, setLine)}>
                          Delete
                      </Button>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </>
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  );
}
