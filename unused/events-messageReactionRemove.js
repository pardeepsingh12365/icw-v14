module.exports = async (bot, db, messageReaction, user) => {
  
 if(user.bot !== true) {
   const rrm = ( await db.ref(`servers/${messageReaction.message.guild.id}/reactrole/${messageReaction.message.id}/`).child('rrm').once('value')).val();
   const rre = ( await db.ref(`servers/${messageReaction.message.guild.id}/reactrole/${messageReaction.message.id}/`).child('rre').once('value')).val();
   const rrole = ( await db.ref(`servers/${messageReaction.message.guild.id}/reactrole/${messageReaction.message.id}/`).child('rrole').once('value')).val();
   if (messageReaction.message.id === rrm) {
     if (messageReaction.emoji.name === rre) {
       messageReaction.message.guild.member(user.id).roles.remove(rrole)
     }
   }
 }
}