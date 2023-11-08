import React from "react";

export const ComponentToPrint = React.forwardRef((props: { props: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => {
    return (
        <div ref={ref}>
            {props.props}
        </div>
    );
});
