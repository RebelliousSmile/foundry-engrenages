import { openBlock, createElementBlock, createElementVNode, withDirectives, vModelText, normalizeClass, Fragment, renderList, toDisplayString, pushScopeId, popScopeId, createTextVNode, renderSlot, resolveComponent, createBlock, withCtx, createVNode, createCommentVNode } from "../module/lib/vue.esm-browser.js";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$a = {
  name: "Header",
  props: ["actor"],
  computed: {
    data() {
      return this.actor.data;
    }
  }
};
const _hoisted_1$9 = { class: "sheet-header" };
const _hoisted_2$7 = ["src", "alt"];
const _hoisted_3$6 = { class: "header-fields" };
const _hoisted_4$6 = { class: "charname" };
const _hoisted_5$6 = { class: "resources grid grid-3col" };
const _hoisted_6$6 = { class: "resource flex-group-center" };
const _hoisted_7$5 = /* @__PURE__ */ createElementVNode("label", {
  for: "data.health.value",
  class: "resource-label"
}, "Health", -1);
const _hoisted_8$5 = { class: "resource-content flexrow flex-center flex-between" };
const _hoisted_9$4 = /* @__PURE__ */ createElementVNode("span", null, " / ", -1);
const _hoisted_10$4 = { class: "resource flex-group-center" };
const _hoisted_11$4 = /* @__PURE__ */ createElementVNode("label", {
  for: "data.power.value",
  class: "resource-label"
}, "Power", -1);
const _hoisted_12$4 = { class: "resource-content flexrow flex-center flex-between" };
const _hoisted_13$4 = /* @__PURE__ */ createElementVNode("span", null, " / ", -1);
const _hoisted_14$4 = { class: "resource flex-group-center" };
const _hoisted_15$4 = /* @__PURE__ */ createElementVNode("label", {
  for: "data.attributes.level.value",
  class: "resource-label"
}, "Level", -1);
const _hoisted_16$4 = { class: "resource-content flexrow flex-center flex-between" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("header", _hoisted_1$9, [
    createElementVNode("img", {
      src: $props.actor.img,
      alt: $props.actor.name,
      class: "profile-img",
      height: "100",
      width: "100"
    }, null, 8, _hoisted_2$7),
    createElementVNode("div", _hoisted_3$6, [
      createElementVNode("h1", _hoisted_4$6, [
        withDirectives(createElementVNode("input", {
          type: "text",
          name: "name",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.actor.name = $event),
          placeholder: "Name"
        }, null, 512), [
          [vModelText, $props.actor.name]
        ])
      ]),
      createElementVNode("div", _hoisted_5$6, [
        createElementVNode("div", _hoisted_6$6, [
          _hoisted_7$5,
          createElementVNode("div", _hoisted_8$5, [
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "data.health.value",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.data.health.value = $event),
              "data-dtype": "Number"
            }, null, 512), [
              [vModelText, $options.data.health.value]
            ]),
            _hoisted_9$4,
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "data.health.max",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.data.health.max = $event),
              "data-dtype": "Number"
            }, null, 512), [
              [vModelText, $options.data.health.max]
            ])
          ])
        ]),
        createElementVNode("div", _hoisted_10$4, [
          _hoisted_11$4,
          createElementVNode("div", _hoisted_12$4, [
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "data.power.value",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $options.data.power.value = $event),
              "data-dtype": "Number"
            }, null, 512), [
              [vModelText, $options.data.power.value]
            ]),
            _hoisted_13$4,
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "data.power.max",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $options.data.power.max = $event),
              "data-dtype": "Number"
            }, null, 512), [
              [vModelText, $options.data.power.max]
            ])
          ])
        ]),
        createElementVNode("div", _hoisted_14$4, [
          _hoisted_15$4,
          createElementVNode("div", _hoisted_16$4, [
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "data.attributes.level.value",
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $options.data.attributes.level.value = $event),
              "data-dtype": "Number"
            }, null, 512), [
              [vModelText, $options.data.attributes.level.value]
            ])
          ])
        ])
      ])
    ])
  ]);
}
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const _sfc_main$9 = {
  name: "Tabs",
  props: ["context", "actor", "group", "tabs"],
  data() {
    return {
      currentTab: "features"
    };
  },
  methods: {
    changeTab(event) {
      if (event && event.currentTarget) {
        let $target = $(event.currentTarget);
        this.currentTab = $target.data("tab");
      }
      for (let [k, v] of Object.entries(this.tabs)) {
        this.tabs[k].active = false;
      }
      this.tabs[this.currentTab].active = true;
    },
    getTabClass(tab, index) {
      return `item ${tab.active ? " active" : ""}`;
    }
  }
};
const _hoisted_1$8 = ["data-group"];
const _hoisted_2$6 = ["data-tab"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("nav", {
    class: normalizeClass("sheet-tabs tabs tabs--" + $props.group),
    "data-group": $props.group
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.tabs, (tab, tabKey) => {
      return openBlock(), createElementBlock("a", {
        key: "tab-" + $props.group + "-" + tabKey,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.changeTab && $options.changeTab(...args)),
        class: normalizeClass($options.getTabClass(tab, tabKey)),
        "data-tab": tabKey
      }, toDisplayString(tab.label), 11, _hoisted_2$6);
    }), 128))
  ], 10, _hoisted_1$8);
}
var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
function getItem(actorId, itemId) {
  const actor = game.actors.get(actorId);
  if (actor) {
    const item = actor.items.get(itemId);
    if (item)
      return item;
  }
  return false;
}
async function itemCreate(actorId, itemBase) {
  const actor = game.actors.get(actorId);
  if (!actor)
    return false;
  return await Item.create(itemBase, { parent: actor });
}
function itemEdit(actorId, itemId) {
  const item = getItem(actorId, itemId);
  if (item)
    item.sheet.render(true);
}
function itemDelete(actorId, itemId) {
  const item = getItem(actorId, itemId);
  if (item)
    item.delete();
}
var ActorFeatures_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => "")();
const _sfc_main$8 = {
  setup() {
    return {
      itemCreate,
      itemEdit,
      itemDelete
    };
  },
  name: "ActorFeatures",
  props: ["context", "actor"],
  computed: {
    data() {
      return this.actor.data;
    },
    itemBase() {
      return {
        name: "New Feature",
        type: "feature",
        data: {}
      };
    }
  },
  methods: {}
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-2c3dce11"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "items-list" };
const _hoisted_2$5 = { class: "item flexrow items-header" };
const _hoisted_3$5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "item-name" }, "Name", -1));
const _hoisted_4$5 = { class: "item-controls" };
const _hoisted_5$5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("i", { class: "fas fa-plus" }, null, -1));
const _hoisted_6$5 = /* @__PURE__ */ createTextVNode(" Add item");
const _hoisted_7$4 = [
  _hoisted_5$5,
  _hoisted_6$5
];
const _hoisted_8$4 = ["data-item-id"];
const _hoisted_9$3 = { class: "item-name" };
const _hoisted_10$3 = { class: "item-image" };
const _hoisted_11$3 = {
  class: "rollable",
  "data-roll-type": "item"
};
const _hoisted_12$3 = ["src", "title"];
const _hoisted_13$3 = { class: "item-controls" };
const _hoisted_14$3 = ["onClick"];
const _hoisted_15$3 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("i", { class: "fas fa-edit" }, null, -1));
const _hoisted_16$3 = [
  _hoisted_15$3
];
const _hoisted_17$3 = ["onClick"];
const _hoisted_18$3 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("i", { class: "fas fa-trash" }, null, -1));
const _hoisted_19$3 = [
  _hoisted_18$3
];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ol", _hoisted_1$7, [
    createElementVNode("li", _hoisted_2$5, [
      _hoisted_3$5,
      createElementVNode("div", _hoisted_4$5, [
        createElementVNode("a", {
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.itemCreate($props.context.actor._id, $options.itemBase)),
          class: "item-control item-create",
          title: "Create item",
          "data-type": "feature"
        }, _hoisted_7$4)
      ])
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.context.features, (item, id) => {
      return openBlock(), createElementBlock("li", {
        key: "data.features." + id,
        class: "item flexrow",
        "data-item-id": item._id
      }, [
        createElementVNode("div", _hoisted_9$3, [
          createElementVNode("div", _hoisted_10$3, [
            createElementVNode("a", _hoisted_11$3, [
              createElementVNode("img", {
                src: item.img,
                title: item.name,
                width: "24",
                height: "24"
              }, null, 8, _hoisted_12$3)
            ])
          ]),
          createElementVNode("h4", null, toDisplayString(item.name), 1)
        ]),
        createElementVNode("div", _hoisted_13$3, [
          createElementVNode("a", {
            onClick: ($event) => $setup.itemEdit($props.context.actor._id, item._id),
            class: "item-control item-edit",
            title: "Edit Item"
          }, _hoisted_16$3, 8, _hoisted_14$3),
          createElementVNode("a", {
            onClick: ($event) => $setup.itemDelete($props.context.actor._id, item._id),
            class: "item-control item-delete",
            title: "Delete Item"
          }, _hoisted_19$3, 8, _hoisted_17$3)
        ])
      ], 8, _hoisted_8$4);
    }), 128))
  ]);
}
var ActorFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-2c3dce11"]]);
const _sfc_main$7 = {
  name: "Tab",
  props: ["context", "actor", "tab", "group"],
  computed: {}
};
const _hoisted_1$6 = ["data-group", "data-tab"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass("tab " + $props.tab.key + ($props.tab.active ? " active" : "")),
    "data-group": $props.group,
    "data-tab": $props.tab.key
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$6);
}
var Tab = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
function onRollable(event, actorId = null) {
  var _a;
  event.preventDefault();
  const element = (_a = event.currentTarget) != null ? _a : event.target;
  const dataset = element.dataset;
  const actor = actorId ? game.actors.get(actorId) : null;
  if (dataset.rollType) {
    if (dataset.rollType == "item" && actor) {
      const itemId = element.closest(".item").dataset.itemId;
      const item = actor.items.get(itemId);
      if (item)
        return item.roll();
    }
  }
  if (dataset.roll) {
    let label = dataset.label ? `[roll] ${dataset.label}` : "";
    let rollData = actor ? actor.getRollData() : {};
    let roll = new Roll(dataset.roll, rollData);
    roll.toMessage({
      speaker: actor ? ChatMessage.getSpeaker({ actor }) : null,
      flavor: label,
      rollMode: game.settings.get("core", "rollMode")
    });
    return roll;
  }
}
function numberFormat(value, dec = 0, sign = false) {
  value = parseFloat(value).toFixed(dec);
  if (sign)
    return value >= 0 ? `+${value}` : value;
  return value;
}
const _sfc_main$6 = {
  setup() {
    return {
      onRollable,
      numberFormat
    };
  },
  name: "Features",
  props: ["context", "actor", "tab"],
  components: {
    ActorFeatures,
    Tab
  },
  computed: {
    data() {
      return this.context.data;
    }
  }
};
const _hoisted_1$5 = { class: "grid grid-3col" };
const _hoisted_2$4 = { class: "sidebar" };
const _hoisted_3$4 = { class: "abilities flexcol" };
const _hoisted_4$4 = ["data-key"];
const _hoisted_5$4 = ["for", "data-roll", "data-label"];
const _hoisted_6$4 = ["name", "onUpdate:modelValue"];
const _hoisted_7$3 = ["data-roll", "data-label"];
const _hoisted_8$3 = { class: "main grid-span-2" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActorFeatures = resolveComponent("ActorFeatures");
  const _component_Tab = resolveComponent("Tab");
  return openBlock(), createBlock(_component_Tab, {
    group: "primary",
    tab: $props.tab
  }, {
    default: withCtx(() => [
      createElementVNode("section", _hoisted_1$5, [
        createElementVNode("aside", _hoisted_2$4, [
          createElementVNode("div", _hoisted_3$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.context.data.abilities, (ability, key) => {
              return openBlock(), createElementBlock("div", {
                key: "data.abilities." + key + ".value",
                "data-key": key,
                class: "ability flexrow flex-group-center"
              }, [
                createElementVNode("label", {
                  onClick: _cache[0] || (_cache[0] = (...args) => $setup.onRollable && $setup.onRollable(...args)),
                  for: "data.abilities." + key + ".value",
                  class: "resource-label rollable flexlarge align-left",
                  "data-roll": "d20+@abilities." + key + ".mod",
                  "data-label": ability.label
                }, toDisplayString(ability.label), 9, _hoisted_5$4),
                withDirectives(createElementVNode("input", {
                  type: "text",
                  name: "data.abilities." + key + ".value",
                  "onUpdate:modelValue": ($event) => ability.value = $event,
                  "data-dtype": "Number"
                }, null, 8, _hoisted_6$4), [
                  [vModelText, ability.value]
                ]),
                createElementVNode("span", {
                  class: "ability-mod rollable",
                  "data-roll": "d20+@abilities." + key + ".mod",
                  "data-label": ability.label
                }, toDisplayString($setup.numberFormat(ability.mod, 0, true)), 9, _hoisted_7$3)
              ], 8, _hoisted_4$4);
            }), 128))
          ])
        ]),
        createElementVNode("section", _hoisted_8$3, [
          createVNode(_component_ActorFeatures, {
            context: $props.context,
            actor: $props.actor
          }, null, 8, ["context", "actor"])
        ])
      ])
    ]),
    _: 1
  }, 8, ["tab"]);
}
var Features = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var Editor_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".sheet .editor-wrapper[data-v-1cb581ee],.sheet .editor[data-v-1cb581ee],.sheet .editor-content[data-v-1cb581ee]{height:100%}\n")();
const _sfc_main$5 = {
  name: "Edtior",
  props: ["owner", "target", "content", "button", "editable", "documents", "links", "rolls", "rollData"],
  data() {
    return {
      canEdit: false
    };
  },
  computed: {},
  methods: {
    enrichHTML() {
      var _a, _b, _c, _d;
      const button = Boolean(this.button);
      const editable = Boolean(this.editable);
      this.canEdit = button && editable;
      const editor = TextEditor.enrichHTML(this.content || "", {
        secrets: this.owner,
        documents: (_a = this.documents) != null ? _a : true,
        links: (_b = this.links) != null ? _b : true,
        rolls: (_c = this.rolls) != null ? _c : true,
        rollData: (_d = this.rollData) != null ? _d : {}
      });
      return editor;
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-1cb581ee"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "editor-wrapper" };
const _hoisted_2$3 = { class: "editor" };
const _hoisted_3$3 = ["data-edit", "innerHTML"];
const _hoisted_4$3 = {
  key: 0,
  class: "editor-edit"
};
const _hoisted_5$3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("i", { class: "fas fa-edit" }, null, -1));
const _hoisted_6$3 = [
  _hoisted_5$3
];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createElementVNode("div", _hoisted_2$3, [
      createElementVNode("div", {
        class: "editor-content",
        "data-edit": $props.target,
        innerHTML: $options.enrichHTML()
      }, null, 8, _hoisted_3$3),
      $data.canEdit ? (openBlock(), createElementBlock("a", _hoisted_4$3, _hoisted_6$3)) : createCommentVNode("", true)
    ])
  ]);
}
var Editor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-1cb581ee"]]);
const _sfc_main$4 = {
  name: "Bio",
  props: ["context", "actor", "tab"],
  computed: {
    data() {
      return this.actor.data;
    }
  },
  components: {
    Tab,
    Editor
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = resolveComponent("Editor");
  const _component_Tab = resolveComponent("Tab");
  return openBlock(), createBlock(_component_Tab, {
    group: "primary",
    tab: $props.tab
  }, {
    default: withCtx(() => [
      createVNode(_component_Editor, {
        button: "true",
        target: "data.biography",
        content: $props.context.data.biography,
        rollData: $props.context.rollData,
        owner: $props.context.owner,
        editable: $props.context.editable
      }, null, 8, ["content", "rollData", "owner", "editable"])
    ]),
    _: 1
  }, 8, ["tab"]);
}
var Bio = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
  setup() {
    return {
      itemCreate,
      itemEdit,
      itemDelete
    };
  },
  name: "Items",
  props: ["context", "actor", "tab"],
  computed: {
    data() {
      return this.actor.data;
    },
    itemBase() {
      return {
        name: "New Item",
        type: "item",
        data: {}
      };
    }
  },
  methods: {},
  components: {
    Tab
  }
};
const _hoisted_1$3 = { class: "items-list" };
const _hoisted_2$2 = { class: "item flexrow items-header" };
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("div", { class: "item-name" }, "Name", -1);
const _hoisted_4$2 = { class: "item-controls" };
const _hoisted_5$2 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-plus" }, null, -1);
const _hoisted_6$2 = /* @__PURE__ */ createTextVNode(" Add item");
const _hoisted_7$2 = [
  _hoisted_5$2,
  _hoisted_6$2
];
const _hoisted_8$2 = ["data-item-id"];
const _hoisted_9$2 = { class: "item-name" };
const _hoisted_10$2 = { class: "item-image" };
const _hoisted_11$2 = {
  class: "rollable",
  "data-roll-type": "item"
};
const _hoisted_12$2 = ["src", "title"];
const _hoisted_13$2 = { class: "item-formula item-prop" };
const _hoisted_14$2 = { class: "item-controls" };
const _hoisted_15$2 = ["onClick"];
const _hoisted_16$2 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-edit" }, null, -1);
const _hoisted_17$2 = [
  _hoisted_16$2
];
const _hoisted_18$2 = ["onClick"];
const _hoisted_19$2 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-trash" }, null, -1);
const _hoisted_20$2 = [
  _hoisted_19$2
];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tab = resolveComponent("Tab");
  return openBlock(), createBlock(_component_Tab, {
    group: "primary",
    tab: $props.tab
  }, {
    default: withCtx(() => [
      createElementVNode("ol", _hoisted_1$3, [
        createElementVNode("li", _hoisted_2$2, [
          _hoisted_3$2,
          createElementVNode("div", _hoisted_4$2, [
            createElementVNode("a", {
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.itemCreate($props.context.actor._id, $options.itemBase)),
              class: "item-control item-create",
              title: "Create item",
              "data-type": "item"
            }, _hoisted_7$2)
          ])
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.context.gear, (item, id) => {
          var _a;
          return openBlock(), createElementBlock("li", {
            key: "data.items." + id,
            class: "item flexrow",
            "data-item-id": item._id
          }, [
            createElementVNode("div", _hoisted_9$2, [
              createElementVNode("div", _hoisted_10$2, [
                createElementVNode("a", _hoisted_11$2, [
                  createElementVNode("img", {
                    src: item.img,
                    title: item.name,
                    width: "24",
                    height: "24"
                  }, null, 8, _hoisted_12$2)
                ])
              ]),
              createElementVNode("h4", null, toDisplayString(item.name), 1)
            ]),
            createElementVNode("div", _hoisted_13$2, toDisplayString((_a = item.data.formula) != null ? _a : ""), 1),
            createElementVNode("div", _hoisted_14$2, [
              createElementVNode("a", {
                onClick: ($event) => $setup.itemEdit($props.context.actor._id, item._id),
                class: "item-control item-edit",
                title: "Edit Item"
              }, _hoisted_17$2, 8, _hoisted_15$2),
              createElementVNode("a", {
                onClick: ($event) => $setup.itemDelete($props.context.actor._id, item._id),
                class: "item-control item-delete",
                title: "Delete Item"
              }, _hoisted_20$2, 8, _hoisted_18$2)
            ])
          ], 8, _hoisted_8$2);
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["tab"]);
}
var Items = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  setup() {
    return {
      itemCreate,
      itemEdit,
      itemDelete
    };
  },
  name: "Spells",
  props: ["context", "actor", "tab"],
  computed: {
    data() {
      return this.actor.data;
    },
    itemBase() {
      return {
        name: "New Spell",
        type: "spell",
        data: {}
      };
    }
  },
  methods: {
    modifiedItemBase(spellLevel) {
      let result = this.itemBase;
      result.name = `New Level ${spellLevel != null ? spellLevel : 1} Spell`;
      result.data.spellLevel = spellLevel;
      return result;
    }
  },
  components: {
    Tab
  }
};
const _hoisted_1$2 = { class: "items-list" };
const _hoisted_2$1 = { class: "item flexrow items-header" };
const _hoisted_3$1 = { class: "item-name" };
const _hoisted_4$1 = { class: "item-controls" };
const _hoisted_5$1 = ["onClick", "data-spell-level"];
const _hoisted_6$1 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-plus" }, null, -1);
const _hoisted_7$1 = /* @__PURE__ */ createTextVNode(" Add item");
const _hoisted_8$1 = [
  _hoisted_6$1,
  _hoisted_7$1
];
const _hoisted_9$1 = ["data-item-id"];
const _hoisted_10$1 = { class: "item-name" };
const _hoisted_11$1 = { class: "item-image" };
const _hoisted_12$1 = {
  class: "rollable",
  "data-roll-type": "item"
};
const _hoisted_13$1 = ["src", "title"];
const _hoisted_14$1 = { class: "item-controls" };
const _hoisted_15$1 = ["onClick"];
const _hoisted_16$1 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-edit" }, null, -1);
const _hoisted_17$1 = [
  _hoisted_16$1
];
const _hoisted_18$1 = ["onClick"];
const _hoisted_19$1 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-trash" }, null, -1);
const _hoisted_20$1 = [
  _hoisted_19$1
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tab = resolveComponent("Tab");
  return openBlock(), createBlock(_component_Tab, {
    group: "primary",
    tab: $props.tab
  }, {
    default: withCtx(() => [
      createElementVNode("ol", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.context.spells, (spells, spellLevel) => {
          return openBlock(), createElementBlock(Fragment, {
            key: "data.spells." + spellLevel
          }, [
            createElementVNode("li", _hoisted_2$1, [
              createElementVNode("div", _hoisted_3$1, "Level " + toDisplayString(spellLevel), 1),
              createElementVNode("div", _hoisted_4$1, [
                createElementVNode("a", {
                  onClick: ($event) => $setup.itemCreate($props.context.actor._id, $options.modifiedItemBase(spellLevel)),
                  class: "item-control item-create",
                  title: "Create item",
                  "data-type": "spell",
                  "data-spell-level": spellLevel
                }, _hoisted_8$1, 8, _hoisted_5$1)
              ])
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(spells, (item, id) => {
              return openBlock(), createElementBlock("li", {
                key: "data.spells." + spellLevel + "." + id,
                class: "item flexrow",
                "data-item-id": item._id
              }, [
                createElementVNode("div", _hoisted_10$1, [
                  createElementVNode("div", _hoisted_11$1, [
                    createElementVNode("a", _hoisted_12$1, [
                      createElementVNode("img", {
                        src: item.img,
                        title: item.name,
                        width: "24",
                        height: "24"
                      }, null, 8, _hoisted_13$1)
                    ])
                  ]),
                  createElementVNode("h4", null, toDisplayString(item.name), 1)
                ]),
                createElementVNode("div", _hoisted_14$1, [
                  createElementVNode("a", {
                    onClick: ($event) => $setup.itemEdit($props.context.actor._id, item._id),
                    class: "item-control item-edit",
                    title: "Edit Item"
                  }, _hoisted_17$1, 8, _hoisted_15$1),
                  createElementVNode("a", {
                    onClick: ($event) => $setup.itemDelete($props.context.actor._id, item._id),
                    class: "item-control item-delete",
                    title: "Delete Item"
                  }, _hoisted_20$1, 8, _hoisted_18$1)
                ])
              ], 8, _hoisted_9$1);
            }), 128))
          ], 64);
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["tab"]);
}
var Spells = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
function onManageActiveEffect(event, owner) {
  var _a;
  event.preventDefault();
  const a = (_a = event.currentTarget) != null ? _a : event.target;
  const li = a.closest("li");
  const effect = li.dataset.effectId ? owner.effects.get(li.dataset.effectId) : null;
  switch (a.dataset.action) {
    case "create":
      return owner.createEmbeddedDocuments("ActiveEffect", [{
        label: "New Effect",
        icon: "icons/svg/aura.svg",
        origin: owner.uuid,
        "duration.rounds": li.dataset.effectType === "temporary" ? 1 : void 0,
        disabled: li.dataset.effectType === "inactive"
      }]);
    case "edit":
      return effect.sheet.render(true);
    case "delete":
      return effect.delete();
    case "toggle":
      return effect.update({ disabled: !effect.data.disabled });
  }
}
const _sfc_main$1 = {
  name: "ActiveEffects",
  props: ["context", "actor", "tab"],
  computed: {
    game() {
      return game;
    }
  },
  methods: {
    manageEffect(event) {
      let owner = game.actors.get(this.context.actor._id);
      if (owner)
        onManageActiveEffect(event, owner);
    }
  },
  components: {
    Tab
  }
};
const _hoisted_1$1 = { class: "items-list effects-list" };
const _hoisted_2 = ["data-effect-type"];
const _hoisted_3 = { class: "item-name effect-name flexrow" };
const _hoisted_4 = /* @__PURE__ */ createElementVNode("div", { class: "effect-source" }, "Source", -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("div", { class: "effect-source" }, "Duration", -1);
const _hoisted_6 = { class: "item-controls effect-controls flexrow" };
const _hoisted_7 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-plus" }, null, -1);
const _hoisted_8 = /* @__PURE__ */ createTextVNode(" Add effect");
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];
const _hoisted_10 = { class: "item-list" };
const _hoisted_11 = ["data-effect-id"];
const _hoisted_12 = { class: "item-name effect-name flexrow" };
const _hoisted_13 = ["src", "title"];
const _hoisted_14 = { class: "effect-source" };
const _hoisted_15 = { class: "effect-duration" };
const _hoisted_16 = { class: "item-controls effect-controls flexrow" };
const _hoisted_17 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-edit" }, null, -1);
const _hoisted_18 = [
  _hoisted_17
];
const _hoisted_19 = /* @__PURE__ */ createElementVNode("i", { class: "fas fa-trash" }, null, -1);
const _hoisted_20 = [
  _hoisted_19
];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tab = resolveComponent("Tab");
  return openBlock(), createBlock(_component_Tab, {
    group: "primary",
    tab: $props.tab
  }, {
    default: withCtx(() => [
      createElementVNode("ol", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.context.effects, (section, sid) => {
          return openBlock(), createElementBlock(Fragment, {
            key: "data.effects." + sid
          }, [
            createElementVNode("li", {
              class: "items-header flexrow",
              "data-effect-type": section.type
            }, [
              createElementVNode("h3", _hoisted_3, toDisplayString($options.game.i18n.localize(section.label)), 1),
              _hoisted_4,
              _hoisted_5,
              createElementVNode("div", _hoisted_6, [
                createElementVNode("a", {
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.manageEffect && $options.manageEffect(...args)),
                  "data-action": "create",
                  class: "effect-control",
                  title: "Create effect"
                }, _hoisted_9)
              ])
            ], 8, _hoisted_2),
            createElementVNode("ol", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(section.effects, (effect, id) => {
                return openBlock(), createElementBlock("li", {
                  key: "data.effects." + sid + "." + id,
                  class: "item effect flexrow",
                  "data-effect-id": effect._id
                }, [
                  createElementVNode("div", _hoisted_12, [
                    createElementVNode("img", {
                      class: "item-image",
                      src: effect.icon,
                      title: effect.label,
                      width: "24",
                      height: "24"
                    }, null, 8, _hoisted_13),
                    createElementVNode("h4", null, toDisplayString(effect.label), 1)
                  ]),
                  createElementVNode("div", _hoisted_14, toDisplayString(effect.sourceName), 1),
                  createElementVNode("div", _hoisted_15, toDisplayString(effect.duration.label), 1),
                  createElementVNode("div", _hoisted_16, [
                    createElementVNode("a", {
                      onClick: _cache[1] || (_cache[1] = (...args) => $options.manageEffect && $options.manageEffect(...args)),
                      "data-action": "toggle",
                      class: "effect-control",
                      title: "Toggle Effect"
                    }, [
                      createElementVNode("i", {
                        class: normalizeClass("fas " + (effect.disabled ? "fa-check" : "fa-times"))
                      }, null, 2)
                    ]),
                    createElementVNode("a", {
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.manageEffect && $options.manageEffect(...args)),
                      "data-action": "edit",
                      class: "effect-control",
                      title: "Edit Effect"
                    }, _hoisted_18),
                    createElementVNode("a", {
                      onClick: _cache[3] || (_cache[3] = (...args) => $options.manageEffect && $options.manageEffect(...args)),
                      "data-action": "delete",
                      class: "effect-control",
                      title: "Delete Effect"
                    }, _hoisted_20)
                  ])
                ], 8, _hoisted_11);
              }), 128))
            ])
          ], 64);
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["tab"]);
}
var ActiveEffects = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var CharacterSheet_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => "h3[data-v-70bb2649]{margin:40px 0 0}ul[data-v-70bb2649]{list-style-type:none;padding:0}li[data-v-70bb2649]{display:inline-block;margin:0 10px}a[data-v-70bb2649]{color:#42b983}\n")();
const _sfc_main = {
  name: "CharacterSheet",
  props: ["msg", "actor", "context"],
  data() {
    return {
      tabs: {
        primary: {
          features: {
            key: "features",
            active: true,
            label: "Features"
          },
          description: {
            key: "description",
            active: false,
            label: "Description"
          },
          items: {
            key: "items",
            active: false,
            label: "Items"
          },
          spells: {
            key: "spells",
            active: false,
            label: "Spells"
          },
          effects: {
            key: "effects",
            active: false,
            label: "Effects"
          }
        }
      }
    };
  },
  components: {
    Header,
    Tabs,
    Features,
    Bio,
    Items,
    Spells,
    ActiveEffects
  },
  methods: {}
};
const _hoisted_1 = { class: "sheet-body" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Header = resolveComponent("Header");
  const _component_Tabs = resolveComponent("Tabs");
  const _component_Features = resolveComponent("Features");
  const _component_Bio = resolveComponent("Bio");
  const _component_Items = resolveComponent("Items");
  const _component_Spells = resolveComponent("Spells");
  const _component_ActiveEffects = resolveComponent("ActiveEffects");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_Header, {
      actor: $props.context.actor
    }, null, 8, ["actor"]),
    createVNode(_component_Tabs, {
      actor: $props.context.actor,
      group: "primary",
      tabs: $data.tabs.primary
    }, null, 8, ["actor", "tabs"]),
    createElementVNode("section", _hoisted_1, [
      createVNode(_component_Features, {
        context: $props.context,
        actor: $props.actor,
        tab: $data.tabs.primary.features
      }, null, 8, ["context", "actor", "tab"]),
      createVNode(_component_Bio, {
        context: $props.context,
        tab: $data.tabs.primary.description
      }, null, 8, ["context", "tab"]),
      createVNode(_component_Items, {
        context: $props.context,
        tab: $data.tabs.primary.items
      }, null, 8, ["context", "tab"]),
      createVNode(_component_Spells, {
        context: $props.context,
        tab: $data.tabs.primary.spells
      }, null, 8, ["context", "tab"]),
      createVNode(_component_ActiveEffects, {
        context: $props.context,
        tab: $data.tabs.primary.effects
      }, null, 8, ["context", "tab"])
    ])
  ], 64);
}
var CharacterSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-70bb2649"]]);
export { CharacterSheet, Editor, Tab, Tabs };
//# sourceMappingURL=components.vue.es.js.map
