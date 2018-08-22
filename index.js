import 'babel-polyfill';
import 'isomorphic-fetch';
import { sp } from "@pnp/sp";
import Logger from "js-logger";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
require('es6-promise').polyfill();

async function MemberCheck (){


  /*eslint-disable*/
  let {baseUrl, groupName, title} = spGrpMemPnp.settings;
  /*esling-enable*/


  let user = await sp.web.currentUser.get();
  await Logger.debug(user);
  let result = await sp.web.siteUsers.getById(user.Id).groups.filter(`LoginName eq '${groupName}'`).get();
  await Logger.debug(result);
  var isMember = await result.length > 0 ? true : false;
  await Logger.debug(isMember);
  await Logger.debug($(`[title="${title}"]`));
  await $(`[title="${title}"]`).checked !== isMember ? $(`[title="${title}"]`).click() : null;
}


( function(){
  Logger.useDefaults();
  /*eslint-disable*/
  let {baseUrl, groupName, title} = spGrpMemPnp.settings;
  /*esling-enable*/

  $(`[title="${title}"]`).css('visibility', 'hidden'); 

  sp.setup({
    sp: {
      headers: {
        Accept: "application/json;odata=verbose",
      },
      baseUrl: baseUrl
   },
  });
  /*eslint-disable*/
  ExecuteOrDelayUntilScriptLoaded(MemberCheck, "sp.js");
  /*eslint-enable*/
})();