// Person Model
let Person = Backbone.Model.extend({
  defaults: {
    name: "",
    dob: ""
  }
});

// Array of Persons
let Persons = Backbone.Collection.extend({});
let persons = new Persons();

// DOM element for person item
var PersonView = Backbone.View.extend({
  model: new Person(),
  tagName: "tr",
  initialize: function() {
    this.template = _.template($(".persons-list-template").html());
  },
  // Delegate events
  events: {
    "click .delete-person": "delete"
  },
  delete: function() {
    this.model.destroy();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// DOM element for persons item
var PersonsView = Backbone.View.extend({
  model: persons,
  el: $(".persons-list"),

  initialize: function() {
    let self = this;
    this.model.on("add", this.render, this);
    this.model.on(
      "change",
      function() {
        setTimeout(function() {
          self.render();
        }, 30);
      },
      this
    );
    this.model.on("remove", this.render, this);
  },
  render: function() {
    document.getElementById("count").textContent = persons.length;
    var self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function(person) {
      self.$el.append(new PersonView({ model: person }).render().$el);
    });
    return this;
  }
});

var personsView = new PersonsView();

$(document).ready(function() {
  $(".add-person").on("click", function() {
    if ($(".name-input").val() !== "") {
      var person = new Person({
        name: $(".name-input").val(),
        dob: $(".dob-input").val()
      });
      $(".name-input").val("");
      $(".dob-input").val("");

      persons.add(person);
    }
  });
});
