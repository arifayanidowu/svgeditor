import React from 'react'
import { Group } from 'react-konva';

export default function PortalWrapper({ selector, enabled, children}: any) {
  const outer = React.useRef<any>(null);
  const inner = React.useRef<any>(null);

  React.useEffect(() => {
    const stage = outer?.current?.getStage();
    const newContainer = stage.findOne(selector);
    if (enabled && newContainer) {
      inner?.current?.moveTo(newContainer);
    } else {
      inner?.current?.moveTo(outer.current);
    }
  
    outer?.current?.getLayer().batchDraw();
    if (newContainer) {
      newContainer.getLayer().batchDraw();
    }
  }, [selector, enabled]);

  return (
    <Group name="_outer_portal" ref={outer}>
      <Group name="_inner_portal" ref={inner}>
        {children}
      </Group>
    </Group>
  );
}
