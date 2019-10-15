import { customElement, property, css, TemplateResult, html, CSSResult, LitElement, query } from 'lit-element';
import { WiredCard } from 'wired-card/lib/wired-card.js';
import 'wired-card/lib/wired-card.js';

@customElement('wired-dialog')
export class WiredDialog extends LitElement {
  @property({ type: Number }) elevation = 5;
  @property({ type: Boolean, reflect: true }) open = false;
  @query('wired-card') private card?: WiredCard;

  static get styles(): CSSResult {
    return css`
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        pointer-events: none;
        z-index: var(--wired-dialog-z-index, 100);
      }
      #container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        opacity: 0;
      }
      #overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      wired-card {
        display: inline-block;
        background: white;
        opacity: 0;
        text-align: left;
      }

      :host([open]) #container {
        opacity: 1;
        pointer-events: auto;
      }
      :host([open]) #container::before {
        opacity: 1;
      }
      :host([open]) wired-card {
        opacity: 1;
      }
    `;
  }

  render(): TemplateResult {
    return html`
    <div id="container">
      <div id="overlay" class="vertical layout">
        <div class="flex"></div>
        <div style="text-align: center; padding: 5px;">
          <wired-card .elevation="${this.elevation}"><slot></slot></wired-card>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `;
  }

  updated() {
    if (this.card) {
      this.card.wiredRender(true);
    }
  }
}