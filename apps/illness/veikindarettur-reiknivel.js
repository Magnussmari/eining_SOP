// veikindarettur-reiknivel.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('veikindaretturForm');
    const nidurstadaElement = document.getElementById('nidurstada');
  
    if (!form || !nidurstadaElement) {
      console.error('Form eða niðurstöðu element fannst ekki');
      return;
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
  
      const market = document.querySelector('input[name="market"]:checked')?.value;
      const starfstimi = Number(document.getElementById('starfstimi').value);
      const starfstimiType = document.getElementById('starfstimiType').value;
      const notadirDagar = Number(document.getElementById('notadirDagar').value);
  
      console.log('Inntaksgögn:', { market, starfstimi, starfstimiType, notadirDagar });
  
      if (!market || isNaN(starfstimi) || !starfstimiType || isNaN(notadirDagar)) {
        console.error('Vantar gögn eða ógild gögn');
        nidurstadaElement.innerHTML = '<p>Villa: Vinsamlegast fylltu út öll svæði rétt.</p>';
        return;
      }
  
      const nidurstada = reiknaVeikindarett(market, starfstimi, starfstimiType, notadirDagar);
      console.log('Niðurstaða:', nidurstada);
  
      nidurstadaElement.innerHTML = `<p>${nidurstada}</p>`;
    });
  });
  
  function reiknaVeikindarett(market, starfstimi, starfstimiType, notadirDagar) {
    const starfstimiManudir = umreiknaStarfstima(starfstimi, starfstimiType);
    const veikindarettur = reiknaHeildarDaga(market, starfstimiManudir);
    const eftirstandandiDagar = Math.max(0, veikindarettur.heildarDagar - notadirDagar);
    
    return byggjaNidurstodutexta(market, eftirstandandiDagar, veikindarettur);
  }
  
  function umreiknaStarfstima(starfstimi, starfstimiType) {
    return starfstimiType === 'ár' ? starfstimi * 12 : starfstimi;
  }
  
  function reiknaHeildarDaga(market, starfstimiManudir) {
    return market === 'almennur' ? 
      reiknaAlmennurMarkaður(starfstimiManudir) : 
      reiknaOpinberMarkaður(starfstimiManudir);
  }
  
  function reiknaAlmennurMarkaður(starfstimiManudir) {
    if (starfstimiManudir < 12) {
      return {
        heildarDagar: Math.floor(starfstimiManudir * 2),
        stadgengilsdagar: Math.floor(starfstimiManudir * 2),
        fullLaunDagar: 0,
        dagvinnuLaunDagar: 0
      };
    }
    if (starfstimiManudir < 24) {
      return {
        heildarDagar: 30,
        stadgengilsdagar: 30,
        fullLaunDagar: 0,
        dagvinnuLaunDagar: 0
      };
    }
    if (starfstimiManudir < 36) {
      return {
        heildarDagar: 60,
        stadgengilsdagar: 30,
        fullLaunDagar: 0,
        dagvinnuLaunDagar: 30
      };
    }
    if (starfstimiManudir < 60) {
      return {
        heildarDagar: 90,
        stadgengilsdagar: 30,
        fullLaunDagar: 0,
        dagvinnuLaunDagar: 60
      };
    }
    // Eftir 5 ár eða meira
    return {
      heildarDagar: 120,
      stadgengilsdagar: 30,
      fullLaunDagar: 30,
      dagvinnuLaunDagar: 60
    };
  }
  
  function reiknaOpinberMarkaður(starfstimiManudir) {
    if (starfstimiManudir < 3) return { heildarDagar: 14 };
    if (starfstimiManudir < 6) return { heildarDagar: 35 };
    if (starfstimiManudir < 12) return { heildarDagar: 119 };
    if (starfstimiManudir < 84) return { heildarDagar: 133 };
    if (starfstimiManudir < 144) return { heildarDagar: 175 };
    if (starfstimiManudir < 216) return { heildarDagar: 273 };
    return { heildarDagar: 360 };
  }
  
  function byggjaNidurstodutexta(market, eftirstandandiDagar, veikindarettur) {
    let texti = `Þú átt ${eftirstandandiDagar} veikindadaga eftir af ${veikindarettur.heildarDagar} dögum samtals.`;
    
    if (market === 'almennur') {
      texti += ` Þar af eru ${veikindarettur.stadgengilsdagar} dagar á staðgengilslaunum`;
      if (veikindarettur.fullLaunDagar > 0) {
        texti += `, ${veikindarettur.fullLaunDagar} dagar á fullum launum (dagvinnulaun, bónus og vaktaálög)`;
      }
      if (veikindarettur.dagvinnuLaunDagar > 0) {
        texti += ` og ${veikindarettur.dagvinnuLaunDagar} dagar á dagvinnulaunum`;
      }
      texti += '.';
    } else {
      texti += ` Allir dagarnir eru á fullum launum.`;
    }
    
    return texti;
  }