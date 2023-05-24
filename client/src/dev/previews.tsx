import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {PdfContainer} from "@/features/TopicPdf/PdfContainer/PdfContainer";
import {Tab} from "@/widgets/Tab/Tab";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/PdfContainer">
                <PdfContainer filename={""} />
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Tab">
                <Tab/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;