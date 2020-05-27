import { LitElement, html } from 'lit-element';

class TodoCard  extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      todo: Object
    };
  }

  constructor() {
    super();
    this.todo = {};
  }

  deleteItem() {
    const event = new CustomEvent('delete-todo', { detail: this.todo });
    document.dispatchEvent(event);
  }

  updateItem() {
    this.todo.done = this.todo.done === 'true'  ? 'false' : 'true';
    const event = new CustomEvent('update-todo', { detail: this.todo });
    document.dispatchEvent(event);
  }

  render() {
    return html`
      <style>
        input:checked + svg {
          display: block;
        }
      </style> 
      <section class="toto-card mt-4 px-4 py-3 bg-gray-300 rounded-lg flex items-center shadow-sm">
        <main class="flex-1 ml-2 truncate">
          <a class="block font-bold text-gray-900 truncate" href="${`/todos/${this.todo.id}`}">${this.todo.title}</a>
          <a class="block font-bold text-gray-900 truncate" href="${`/todos/${this.todo.id}`}">${this.todo.description}</a>
        </main>
        ${this.todo.synced === 'false' ? html`<lit-icon icon="cloud-off"></lit-icon>` : '' }
        <button @click="${this.deleteItem}" class="ml-2 text-red-600" aria-label="Delete">
          <lit-icon icon="delete"></lit-icon>
        </button>
      </section>
    `;
  }
}

customElements.define('todo-card', TodoCard);