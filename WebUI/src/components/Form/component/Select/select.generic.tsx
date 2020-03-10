import * as React from "react";
import { Select, FormControl } from "@material-ui/core";

const container: React.CSSProperties =
{
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    margin: 10
}

const formControl: React.CSSProperties =
{
    minWidth: "100%",
    border: "solid thin grey",
    borderRadius: 5,
    padding: 15
}

const inputLabel: React.CSSProperties =
{
    marginBottom: 5
}

export interface SelectProps<TItem extends {Id: number | undefined, Name: string | undefined}>
{
    id: string;
    data: Array<TItem>;
    displayMember: (item:TItem) => string;
    valueMember: (item:TItem) => string;
    style?: React.CSSProperties;
    selectedValue?: any;
    onChange?: (item:TItem) => void;
    onBlur? : (item:TItem) => void;
    label?: string;
    name?: string;
    className?: string;
}

export type Select<TItem extends {Id: number | undefined, Name: string | undefined}> = new(props: SelectProps<TItem>) => GenericSelect<TItem>;

export class GenericSelect<TItem extends {Id: number | undefined, Name: string | undefined}> extends React.Component<SelectProps<TItem>, {}>
{
    private onChange(e: React.ChangeEvent<HTMLSelectElement>)
    {
        if (this.props.onChange)
        {
            const item = this.props.data.toEnum().First(p => this.props.valueMember(p) === e.target.value);
            this.props.onChange(item)
        }
    }
    render()
    {
        const items = this.props.data.map((item) =>
                <option key={ this.props.valueMember(item) } value={ this.props.valueMember(item) }>
                    { this.props.displayMember(item) }
                </option>)

        const Body = () =>
            <FormControl required style={formControl}>
                <Select
                    native
                    disableUnderline
                    onChange={ e => this.onChange(e) }
                    style={ this.props.style }
                    value={ this.props.selectedValue }>
                    { items }
                    name={this.props.name}
                </Select>
            </FormControl>

        return Body();
    }

}