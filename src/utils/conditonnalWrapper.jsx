
export const ConditonnalWrapper = ({wrap,wrapper,children})=> (
    wrap ? wrapper(children) : children

)