// create a new user on refresh
// let abc = new User();
// reset button
let abc = new synData();

for (var i = 0; i < document.querySelectorAll(".b").length; i++) {
  document.querySelectorAll(".b")[i].addEventListener("click", function(event) {
    handleClick(this.name);
  });
}

$('#reset').click(function(event) {
  abc = new synData(); //데이터삭
  $("h1 span").html(0); // 숫삭
  $(".synergy").html(""); //시삭
  $(".mainmenu button").addClass("g"); // 색삭
});
$('.reset').click(function(event) {
  abc = new synData(); //데이터삭
  $("h1 span").html(0); // 숫삭
  $(".synergy").html(""); //시삭
  $(".mainmenu button").addClass("g"); // 색삭
});

$('#save').click(function(event) {
  let synData = JSON.stringify(abc);
  let unitData = JSON.stringify([...currentUnitsName.keys()]);
  post('/', {synData : synData, unitData: unitData});
});



function handleClick(name) {
  var key = "." + name;
  var activeButton = document.querySelectorAll(key);
  // console.log(activeButton);
  // 색입히기 / 벗기기
  let flag = 1;
  let answer = true;
  for (let i = 0; i < activeButton.length; i++) {
    answer = activeButton[i].classList.toggle("g");
  }
  //토탈 갯수 늘리기 / 줄이기
  if (answer === true) {
    flag = -1;
    currentUnitsName.delete(name);
  } else {
    currentUnitsName.add(name);
  }

  abc.total += flag;
  //직업 갯수 늘리기 / 줄이기
  classArr = unitToTypeArray(name);
  for (let i = 0; i < classArr.length; i++) {
    abc[classArr[i]] += 1 * flag;
  }
  //화면에 띄우는 정보 업데이트 ([] = 유닛들, 직업 x N , 시너지 작용중: )
  // console.log(abc);
  $("h1 span").html(abc.total);
  checkSynergy(abc);
}

function addOrReplace(str, num) {
  let replace = ""
  if (num > 0) {
    replace = str + "(" + num + ")";
  }
  let regex = new RegExp(str + '\\([0-9]\\)');
  let synergyText = $('.synergy').html();
  // 엘프가 있으면 엘프를 교체하는거, 아무것도 없다 그럼 쌩으로 추가
  if (synergyText.includes(str)) {
    $(".synergy").text(function() {
      return $(this).text().replace(regex, replace);
    });
  } else {
    $(".synergy").append(replace + " ");
  }
}

function checkSynergy(user) {
  if (user.elf < 3) {
    addOrReplace("엘프", 0);
  }
  if (user.elf >= 3) {
    //엘프 시너지 온
    addOrReplace("엘프", 3);
    if (user.elf >= 6) {
      addOrReplace("엘프", 6);
      if (user.elf >= 9) {
        addOrReplace("엘프", 9);
      }
    }
  }
  if (user.human < 2) {
    addOrReplace("인간", 0);
  }
  if (user.human >= 2) {
    addOrReplace("인간", 2);
    if (user.human >= 4) {
      addOrReplace("인간", 4);
      if (user.human >= 6) {
        addOrReplace("인간", 6);
      }
    }
  }

  if (user.beast < 2) {
    addOrReplace("야수", 0);
  }
  if (user.beast >= 2) {
    addOrReplace("야수", 2);
    if (user.beast >= 4) {
      addOrReplace("야수", 4);
      if (user.beast >= 6) {
        addOrReplace("야수", 6);
      }
    }
  }

  if (user.goblin < 3) {
    addOrReplace("고블린", 0);
  }
  if (user.goblin >= 3) {
    addOrReplace("고블린", 3);
    if (user.goblin >= 6) {
      addOrReplace("고블린", 6);
    }
  }
  if (user.demon >= 1) {
    if (user.demon > 1) {
      if (user.dehunter === 2) {
        addOrReplace("데몬", 1);
      } else {
        addOrReplace("데몬", 0);
      }
    }
    if (user.demon === 1) {
      addOrReplace("데몬", 1);
    }
  }
  if (user.undead < 2) {
    addOrReplace("언데드", 0);
  }
  if (user.undead >= 2) {
    addOrReplace("언데드", 2);
    if (user.undead >= 4) {
      addOrReplace("언데드", 4);
    }
  }

  if (user.orc < 2) {
    addOrReplace("오크", 0);
  }
  if (user.orc >= 2) {
    addOrReplace("오크", 2);
    if (user.orc >= 4) {
      addOrReplace("오크", 4);
    }
  }

  if (user.naga < 2) {
    addOrReplace("나가", 0);
  }
  if (user.naga >= 2) {
    addOrReplace("나가", 2);
    if (user.naga >= 4) {
      addOrReplace("나가", 4);
    }
  }

  if (user.ass < 3) {
    addOrReplace("어쌔신", 0);
  }
  if (user.ass >= 3) {
    addOrReplace("어쌔신", 3);
    if (user.ass >= 6) {
      addOrReplace("어쌔신", 6);
      if (user.ass >= 9) {
        addOrReplace("어쌔신", 9);
      }
    }
  }

  if (user.warrior < 3) {
    addOrReplace("워리어", 0);
  }
  if (user.warrior >= 3) {
    addOrReplace("워리어", 3);
    if (user.warrior >= 6) {
      addOrReplace("워리어", 6);
      if (user.warrior >= 9) {
        addOrReplace("워리어", 9);
      }
    }
  }

  if (user.mage < 3) {
    addOrReplace("메이지", 0);
  }
  if (user.mage >= 3) {
    addOrReplace("메이지", 3);
    if (user.mage >= 6) {
      addOrReplace("메이지", 6);
      if (user.mage >= 9) {
        addOrReplace("메이지", 9);
      }
    }
  }

  if (user.warlock < 3) {
    addOrReplace("워록", 0);
  }
  if (user.warlock >= 3) {
    addOrReplace("워록", 3);
    if (user.warlock >= 6) {
      addOrReplace("워록", 6);
      if (user.warlock >= 9) {
        addOrReplace("워록", 9);
      }
    }
  }

  if (user.hunter < 3) {
    addOrReplace("헌터", 0);
  }
  if (user.hunter >= 3) {
    addOrReplace("헌터", 3);
    if (user.hunter >= 6) {
      addOrReplace("헌터", 6);
    }
  }

  if (user.knight < 2) {
    addOrReplace("기사", 0);
  }
  if (user.knight >= 2) {
    addOrReplace("기사", 2);
    if (user.knight >= 4) {
      addOrReplace("기사", 4);
      if (user.knight >= 6) {
        addOrReplace("기사", 6);
      }
    }
  }

  if (user.mech < 2) {
    addOrReplace("기계", 0);
  }
  if (user.mech >= 2) {
    addOrReplace("기계", 2);
    if (user.mech >= 4) {
      addOrReplace("기계", 4);
    }
  }

  if (user.druid < 2) {
    addOrReplace("드루", 0);
  }
  if (user.druid >= 2) {
    addOrReplace("드루", 2);
    if (user.druid >= 4) {
      addOrReplace("드루", 4);
    }
  }

  if (user.shaman < 2) {
    addOrReplace("샤먼", 0);
  }
  if (user.shaman >= 2) {
    addOrReplace("샤먼", 2);
  }

  if (user.dehunter < 1) {
    addOrReplace("데헌", 0);
  }
  if (user.dehunter >= 1) {
    addOrReplace("데헌", 1)
    if (user.dehunter >= 2) {
      addOrReplace("데헌", 2)
    }
  }
} // end check snynergy

function unitToTypeArray(unitName) {
  switch (unitName) {
    case "ogremagi":
      return ["ogre", "mage"];
    case "axe":
      return ["orc", "warrior"];
    case "enchantress":
      return ["beast", "druid"];
    case "tusk":
      return ["beast", "warrior"];
    case "drowranger":
      return ["undead", "hunter"];
    case "bountyhunter":
      return ["goblin", "ass"];
    case "clockwerk":
      return ["goblin", "mech"];
    case "tinker":
      return ["goblin", "mech"];
    case "shadowshaman":
      return ["troll", "shaman"];
    case "batrider":
      return ["troll", "knight"];
    case "antimage":
      return ["elf", "dehunter"];
    case "tiny":
      return ["elemental", "warrior"];
    case "crystalmaiden":
      return ["human", "mage"];
    case "beastmaster":
      return ["orc", "hunter"];
    case "juggernaut":
      return ["orc", "warrior"];
    case "timbersaw":
      return ["goblin", "mech"];
    case "queenofpain":
      return ["demon", "ass"];
    case "puck":
      return ["elf", "dragon"];
    case "witchdoctor":
      return ["troll", "warlock"];
    case "slardar":
      return ["naga", "warrior"];
    case "chaosknight":
      return ["demon", "knight"];
    case "treantprotector":
      return ["elf", "druid"];
    case "luna":
      return ["elf", "knight"];
    case "furion":
      return ["elf", "druid"];
    case "morphling":
      return ["elemental", "ass"];
    case "slark":
      return ["naga", "ass"];
    case "abbadon":
      return ["undead", "knight"];
    case "shadowfiend":
      return ["demon", "warlock"];
    case "lycan":
      return ["human", "warrior", "beast"];
    case "phantomassassin":
      return ["elf", "ass"];
    case "terrorblade":
      return ["demon", "dehunter"];
    case "sandking":
      return ["beast", "ass"];
    case "razor":
      return ["mage", "elemental"];
    case "lina":
      return ["mage", "human"];
    case "viper":
      return ["dragon", "ass"];
    case "sniper":
      return ["dwarf", "hunter"];
    case "windranger":
      return ["elf", "hunter"];
    case "omniknight":
      return ["human", "knight"];
    case "venomancer":
      return ["beast", "warlock"];
    case "riki":
      return ["satyr", "ass"];
    case "mirana":
      return ["elf", "hunter"];
    case "dragonknight":
      return ["dragon", "knight", "human"];
    case "lonedruid":
      return ["beast", "druid"];
    case "kunkka":
      return ["human", "warrior"];
    case "medusa":
      return ["naga", "hunter"];
    case "templarassassin":
      return ["elf", "ass"];
    case "disruptor":
      return ["orc", "shaman"];
    case "doom":
      return ["demon", "warrior"];
    case "alchemist":
      return ["goblin", "warlock"];
    case "necrophos":
      return ["undead", "warlock"];
    case "trollwarlord":
      return ["troll", "warrior"];
    case "keeperofthelight":
      return ["human", "mage"];
    case "lich":
      return ["undead", "mage"];
    case "tidehunter":
      return ["naga", "hunter"];
    case "enigma":
      return ["elemental", "warlock"];
    case "gyrocopter":
      return ["dwarf", "mech"];
    case "techies":
      return ["goblin", "mech"];
    case "deathprophet":
      return ["undead", "warlock"];
    default:
      console.log("not found");
  }
}
