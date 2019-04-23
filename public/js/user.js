class synData {
  constructor() {
    this.total = 0;
    this.elf = 0;
    this.human = 0;
    this.beast = 0;
    this.goblin = 0;
    this.demon = 0;
    this.undead = 0;
    this.orc = 0;
    this.naga = 0;
    this.ass = 0;
    this.warrior = 0;
    this.mage = 0;
    this.warlock = 0;
    this.hunter = 0;
    this.knight = 0;
    this.mech = 0;
    this.druid = 0;
    this.shaman = 0;
    this.dehunter = 0;
    this.troll = 0;
    this.elemental = 0;
    this.dragon = 0;
    this.ogre = 0;
    this.satyr = 0;
    this.dwarf = 0;
  }
  get totalSyn() {
    return this.elf + this.human + this.beast + this.goblin + this.demon + this.undead + this.orc +
      this.naga + this.ass + this.warrior + this.mage + this.warlock + this.hunter + this.knight +
      this.mech + this.druid + this.shaman + this.dehunter + this.troll + this.elemental + this.dragon +
      this.ogre + this.satyr + this.dwarf;
  }
}

const currentUnitsName = new Set();

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}
