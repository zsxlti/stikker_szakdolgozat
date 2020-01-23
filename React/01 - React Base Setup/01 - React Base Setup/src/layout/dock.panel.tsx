import * as React from 'react';

export const dockLeft =  { 'data-dock-panel-dock' : 'left' }
export const dockRight =  { 'data-dock-panel-dock' : 'right' }
export const dockTop =  { 'data-dock-panel-dock' : 'top' }
export const dockBottom =  { 'data-dock-panel-dock' : 'bottom' }

type DockSide = 'left' | 'right' | 'top' | 'bottom';

interface DockPanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
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
}

export class DockPanel extends React.Component<DockPanelProps, {}>
{
    constructor(props: DockPanelProps) {
        super(props);
        this.outupt = this.generateDockPanel(props);
    }
    private outupt: JSX.Element | null = null;

    private generateDockPanel(newProps: DockPanelProps) {
        // first, take "rest" and some variables, we want lastChildFill to set
        // to true if nothing is set, by default we always set last child to fill
        const { stretch, lastChildFill, ...rest } = newProps;
        const fill = newProps.lastChildFill === undefined ? true : newProps.lastChildFill;

        const reformatProps = (element: React.ReactElement<any>, grow: boolean, shrink: boolean) => ({
            ...element.props,
            ...{ style: {
                ...(grow ? { flexGrow: 1 } : {}),
                ...(shrink ? {} : { flexShrink: 0 }),
                ...(element.props ? element.props.style : {}),
            }}
        });

        // get react children, and this is not a const, because we want to change
        // this in case that lastChildFill is set to true, in which case we remove
        // last child from the collection and then we manually add that child back
        // to specific div
        const rawChildren = React.Children
            .map(newProps.children, c => c as React.ReactElement<any> | string);

        if (rawChildren === undefined)
        {
                return null;
        }

        const children = rawChildren
            .map((p, i) => {
                const expandLastChild = (i === rawChildren.length - 1) && fill;
                if (typeof p === 'string')
                {
                    return p;
                }

                return React.cloneElement(p, reformatProps(p, expandLastChild, expandLastChild))
            });

        let lastChild: React.ReactElement<any> | null = null;

        if (fill) {
            const last = children[children.length - 1];
            if (last != null && typeof last !== 'string')
            {
                lastChild = last;
                children.remove(lastChild!);
            }
        }

        // here we want to create pairs between react element and our custom
        // data anotation we use, this is core part as we use this info to know
        // how to dock elements
        const mapped = children
            .map((c, i) => ({
                reactChild: c,
                side: typeof c === 'string' ?
                    // For string elements return just left
                    'left' :
                    // For React Elements return actual side, if any
                    c.props['data-dock-panel-dock'] as (DockSide | undefined) || 'left'
            }));

        // get the distinct sides, we need to get in exact order side values,
        // because ordering is important, changing order of children elements
        // will always cause diferent rendering (this is expected)
        const distinctSides = mapped
            .map(p => p.side as (DockSide | undefined))
            .filter((v, i, a) => a.indexOf(v) === i);

        // get the possible sides, there are max four of them (DockSide), and
        // each side has its own mapping on Flex properties, for instance, if
        // first child element is set to "top", then we set Flex property
        // "flexDirection" to "column", in this way Flex will render elements
        // vertically, from top to bottom, but if we want to set element at the
        // bottom, we would set "flexDirection" to "column-reverse" as this will
        // render elements from bottom to top
        const s1 = distinctSides[0];
        const s2 = distinctSides[1];
        const s3 = distinctSides[2];
        const s4 = distinctSides[3];

        const coll1 = s1 ? mapped.filter(p => p.side === s1).map(p => p.reactChild) : [];
        const coll2 = s2 ? mapped.filter(p => p.side === s2).map(p => p.reactChild) : undefined;
        const coll3 = s3 ? mapped.filter(p => p.side === s3).map(p => p.reactChild) : undefined;
        const coll4 = s4 ? mapped.filter(p => p.side === s4).map(p => p.reactChild) : undefined;

        // if lastChildFill is set, then we have to add lastChild "manually"
        // (here) back to one of the collections, it all depends which is the
        // last collection, which means that last div will contain this child
        // and its "flexGrow" property is set to 1, as we want to add last
        // child to last div generated
        if (lastChild) {
            if (coll4) coll4.push(lastChild);
            else if (coll3) coll3.push(lastChild);
            else if (coll2) coll2.push(lastChild);
            else coll1.push(lastChild);
        }

        const flexDirection = (side: DockSide | undefined) =>
            side === 'left'  ? 'row' :
            side === 'right' ? 'row-reverse' :
            side === 'top' ? 'column' :
            side === 'bottom' ? 'column-reverse' : 'row' ;

        const flexStyle = (side: DockSide | undefined, stretch?: boolean): React.CSSProperties => ({
            ...(stretch ? { flexGrow: 1 } : {}),
            overflow: 'hidden',
            display: 'Flex',
            flexDirection: flexDirection(side),
        });

        // this is the logic we use to allow adding elements on each side:
        // we read first (unique) side value, and depending on its value
        // we generate the style, we then add collection of the first side
        // and then we repeat the process for each side, so if we have all
        // four sides set in children (left, right, top, bottom) then we'll
        // get four divs generated....
        return (
            <div {...rest} style={{ ...flexStyle(s1, stretch), ...newProps.style }}>
                { coll1 }
                { s2 &&
                    <div style={ flexStyle(s2, true) }>
                        { coll2 }
                        { s3 &&
                            <div style={ flexStyle(s3, true) }>
                                { coll3 }
                                { s4 &&
                                    <div style={ flexStyle(s4, true) }>
                                        { coll4 }
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>);
    }

    componentWillReceiveProps(newProps: DockPanelProps) {
        this.outupt = this.generateDockPanel(newProps);
    }

    render() {
        return this.outupt;
    }
}
