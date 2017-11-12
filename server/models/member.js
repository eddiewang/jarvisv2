export default (sequelize, DataTypes) => {
  const Member = sequelize.define("member", {
    user_id: DataTypes.INTEGER,
    community_id: DataTypes.INTEGER
  })
}
