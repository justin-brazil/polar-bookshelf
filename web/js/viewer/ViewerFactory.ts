import {Model} from '../model/Model';
import {DocFormats} from '../docformat/DocFormats';
import {HTMLViewer} from './html/HTMLViewer';
import {PDFViewer} from './pdf/PDFViewer';
import {EPUBViewer} from "./epub/EPUBViewer";

export class ViewerFactory {

    public static create(model: Model) {

        const format = DocFormats.getFormat();

        switch (format) {
            case "html":
                return new HTMLViewer(model);

            case "pdf":
                return new PDFViewer(model);

            case "epub":
                return new EPUBViewer(model);

            default:
                throw new Error("Unknown doc format: " + format);
        }

    }

}
