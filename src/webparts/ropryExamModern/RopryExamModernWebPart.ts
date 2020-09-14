import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "RopryExamModernWebPartStrings";
import RopryExamModern from "./components/RopryExamModern";
import { IRopryExamModernProps } from "./components/IRopryExamModernProps";

export interface IRopryExamModernWebPartProps {
  description: string;
}

export default class RopryExamModernWebPart extends BaseClientSideWebPart<
  IRopryExamModernWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRopryExamModernProps> = React.createElement(
      RopryExamModern,
      {
        description: this.properties.description,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
