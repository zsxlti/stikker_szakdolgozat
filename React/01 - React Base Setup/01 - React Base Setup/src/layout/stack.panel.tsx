import * as React from 'react';

export type Orientation = 'horizontal' | 'horizontal-reverse' | 'vertical' | 'vertical-reverse';

export interface StackPanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {

    /**
     * Alows to control orientation of the content. It can be used
     * to align content horizontaly or vertically
     */
    orientation?: Orientation;

   /**
     * Forces StackPanel to grow, to fill remaining space if it is placed
     * in another StackPanel or DockPanel (actually any Flex div, because
     * this property will append to div FlexGrow property to 1)
     */
    stretch?: boolean;

    /**
     * Indicates whether the last child shoul be filled. By default
     * this is turned off, last child in the list will have its size
     * intact and no stretching will be performed, but when this is
     * set to true, last child will be filled with remaining space
     */
    lastChildFill?: boolean;

    /**
     * Centers the given content horizontally
     */
    centerHorizontally?: boolean;

    /**
     * Centers the given content vertically
     */
    centerVertically?: boolean;

    style?: React.CSSProperties;
}

export class StackPanel extends React.Component<StackPanelProps, {}>
{
    constructor(props: StackPanelProps) {
        super(props);
        this.outupt = this.generateStackPanel(props);
    }

    private outupt: JSX.Element | null = null;

    private generateStackPanel(newProps: StackPanelProps) {
        const { stretch, lastChildFill, orientation, centerHorizontally, centerVertically, ...rest } = newProps;
        const fill = lastChildFill === true ? true : false;

        const reformatProps = (element: React.ReactElement<any>, grow: boolean) => ({
            ...element.props,
            ...{ style: {
                ...(grow ? { flexGrow: 1 } : {}),
                ...(element.props ? element.props.style : {})
            }}
        });

        // get react children, and this is not a const, because we want to change
        // this in case that lastChildFill is set to true, in which case we remove
        // last child from the collection and then we manually add that child back
        // to specific div
        let children = React.Children.map(newProps.children, c => c as any);
        if (children === undefined)
        {
            return null;
        }

        if (fill) {
            // in case that lastChildFill is set to true, we want to add additional
            // properties to child element, in this case it is flexGrow, which will
            // force child to stretch inside the flex element
            let lastChild = children[children.length - 1] as React.ReactElement<any>;

            if (lastChild != null && typeof lastChild !== 'string') {
                children.remove(lastChild);
                lastChild = React.cloneElement(lastChild, reformatProps(lastChild, true));
                children.push(lastChild);
            }
        }

        const flexDirection = (o: Orientation | undefined) =>
            o === 'horizontal'  ? 'row' :
            o === 'horizontal-reverse' ? 'row-reverse' :
            o === 'vertical' ? 'column' :
            o === 'vertical-reverse' ? 'column-reverse' : 'row' ;

        const alignHorizontally = (o: Orientation | undefined, center?: boolean) =>
            center ?
                (o === 'vertical' || o === 'vertical-reverse' ? { alignItems: 'center' as 'center' } : { justifyContent: 'center' as 'center' }) :
                {};

        const alignVertically = (o: Orientation | undefined, center?: boolean) =>
            center ?
                (o === 'vertical' || o === 'vertical-reverse' ? { justifyContent: 'center' as 'center' } : { alignItems: 'center' as 'center' }) :
                {};

        const flexStyle: React.CSSProperties = {
            ...newProps.style,
            ...(stretch ? { flexGrow: 1 } : {}),
            ...(alignHorizontally(orientation, centerHorizontally)),
            ...(alignVertically(orientation, centerVertically)),
            display: 'Flex',
            flexDirection: flexDirection(orientation),
            ...this.props.style
        }

        const Body = () =>
            <div {...rest} style={ flexStyle }>
                { children }
            </div>

        return Body();
    }

    componentWillReceiveProps(newProps: StackPanelProps) {
        this.outupt = this.generateStackPanel(newProps);
    }

    render() {
        return this.outupt;
    }
}