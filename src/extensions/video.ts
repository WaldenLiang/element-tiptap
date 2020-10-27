// @ts-nocheck
import { Node as ProsemirrorNode, DOMOutputSpec } from 'prosemirror-model';
import { CommandGetter, Node, MenuData } from 'tiptap';
import { MenuBtnView } from '@/../types';
import { deleteSelection } from 'prosemirror-commands';
import InsetVideoCommandButton from '@/components/MenuCommands/video/insetVideoCommandButton';

// @ts-ignore
function getAttrs (dom: HTMLElement): { [key: string]: any } {
  return {
    src: dom.getAttribute('src') || '',
    autoplay: dom.getAttribute('autoplay') || '',
    controls: dom.getAttribute('controls') || '',
    muted: dom.getAttribute('muted') || '',
    poster: dom.getAttribute('poster') || '',
    loop: dom.getAttribute('loop') || ''
  };
}

function toDOM (node: ProsemirrorNode): DOMOutputSpec {
  const { src, autoplay, controls, muted, poster, loop } = node.attrs;

  const attrs: { [key: string]: any } = {
    src
  };

  if (autoplay) {
    attrs.autoplay = autoplay;
  }

  if (controls) {
    attrs.controls = controls;
  }

  if (muted) {
    attrs.muted = muted;
  }

  if (poster) {
    attrs.poster = poster;
  }

  if (loop) {
    attrs.loop = loop;
  }

  return ['video', attrs];
}

export default class Video extends Node implements MenuBtnView {
  get name () {
    return 'video';
  }

  get schema () {
    return {
      attrs: {
        src: {
          default: '',
        },
        autoplay: {
          default: ''
        },
        controls: {
          default: ''
        },
        muted: {
          default: ''
        },
        poster: {
          default: ''
        },
        loop: {
          default: ''
        }
      },
      group: 'block',
      draggable: false,
      parseDOM: [{ tag: 'video[src]', getAttrs }],
      toDOM,
    };
  }

  commands ({ type }): CommandGetter {
    return {
      video: attrs => (state, dispatch) => {
        const { selection } = state;
        const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
        const node = type.create(attrs);
        const transaction = state.tr.insert(position, node);
        dispatch(transaction);
      },
      removeNode: () => (state, dispatch) => {
        deleteSelection(state, dispatch);
      },
      updateNode: attrs => {
        return (state, dispatch) => {
          const { node, from } = state.selection; // must be a node selection, so make sure "node" is present

          const tr = state.tr;
          tr.setNodeMarkup(from, null, Object.assign({}, node.attrs, attrs));
          dispatch(tr);

          return true;
        };
      }
    };
  }

  menuBtnView (editorContext: MenuData) {
    return {
      component: InsetVideoCommandButton,
      componentProps: {
        editorContext,
      },
    };
  }
}
