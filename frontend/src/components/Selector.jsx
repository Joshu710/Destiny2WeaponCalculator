import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FilterButton from "../components/filter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Selector(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState(props.filterValue);

  const [weaponData, setWeaponData] = useState([]);

  // Perks current weapon can use
  const [perks, setPerks] = useState([[]]);

  const [selectedPerks, setSelectedPerks] = useState([0, 0, 0, 0, 0]);

  // Used to render page after a change
  const [render, setRender] = useState(false);

  // Possible changes a perk can do
  const perkChanges = {
    impact_change: 0,
    range_change: 0,
    stability_change: 0,
    handling_change: 0,
    reload_change: 0,
    rpm_change: 0,
    magazine_change: 0,
    reload_change_percentage: 1,
    magazine_change_percentage: 1,
    damage_change: 1,
    charge_time: 0,
    charge_rate: 0,
    guard_resistance: 0,
    guard_endurance: 0,
    blast_radius: 0,
  };
  const [changes, setChanges] = useState(perkChanges);

  const navigate = useNavigate();

  const getFilter = (data) => {
    setFilterValue(data);
    props.filterValue(data);
  };

  // Takes search term to results page
  const searchCallBack = (event) => {
    event.preventDefault();
    props.search(searchTerm);
    navigate("/results");
  };

  // If no weapon is selected, return to home page
  const checkEmpty = () => {
    if (props.weapon == 0) {
      navigate("/");
    }
  };

  // Get data about current weapon
  const getWeaponData = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-weapon-data/${props.weapon}/${props.table}/`
      );
      setWeaponData(response.data.weapon_data[0]);
      setPerks(response.data.perk_data);
    } catch (error) {
      console.log("Error getting weapon data:", error);
    }
  };

  const handlePerkSelection = (e, perk, slot) => {
    const newSelected = selectedPerks;
    const newChanges = changes;
    // If previous perk at the current slot exists, unapply it
    if (newSelected[slot - 1] != 0) {
      newChanges.impact_change -= newSelected[slot - 1].impact_change;
      newChanges.range_change -= newSelected[slot - 1].range_change;
      newChanges.stability_change -= newSelected[slot - 1].stability_change;
      newChanges.handling_change -= newSelected[slot - 1].handling_change;
      newChanges.reload_change -= newSelected[slot - 1].reload_change;
      newChanges.rpm_change -= newSelected[slot - 1].rpm_change;
      newChanges.magazine_change -= newSelected[slot - 1].magazine_change;
      newChanges.reload_change_percentage /=
        newSelected[slot - 1].reload_change_percentage != 0
          ? newSelected[slot - 1].reload_change_percentage
          : 1;
      newChanges.magazine_change_percentage /=
        newSelected[slot - 1].magazine_change_percentage != 0
          ? newSelected[slot - 1].magazine_change_percentage
          : 1;
      newChanges.damage_change /=
        newSelected[slot - 1].damage_change != 0
          ? newSelected[slot - 1].damage_change
          : 1;
      newChanges.charge_rate -= newSelected[slot - 1].charge_rate;
      newChanges.charge_time -= newSelected[slot - 1].charge_time;
      newChanges.guard_resistance -= newSelected[slot - 1].guard_resistance;
      newChanges.guard_endurance -= newSelected[slot - 1].guard_endurance;
      newChanges.blast_radius -= newSelected[slot - 1].blast_radius;
    }

    // If previous perk is also current, deselect it
    if (newSelected[slot - 1] == perk) {
      newSelected[slot - 1] = 0;
    }
    // If perk is new, apply it
    else {
      newSelected[slot - 1] = perk;
      newChanges.impact_change += newSelected[slot - 1].impact_change;
      newChanges.range_change += newSelected[slot - 1].range_change;
      newChanges.stability_change += newSelected[slot - 1].stability_change;
      newChanges.handling_change += newSelected[slot - 1].handling_change;
      newChanges.reload_change += newSelected[slot - 1].reload_change;
      newChanges.rpm_change += newSelected[slot - 1].rpm_change;
      newChanges.magazine_change += newSelected[slot - 1].magazine_change;
      newChanges.reload_change_percentage *=
        newSelected[slot - 1].reload_change_percentage != 0
          ? newSelected[slot - 1].reload_change_percentage
          : 1;
      newChanges.magazine_change_percentage *=
        newSelected[slot - 1].magazine_change_percentage != 0
          ? newSelected[slot - 1].magazine_change_percentage
          : 1;
      newChanges.damage_change *=
        newSelected[slot - 1].damage_change != 0
          ? newSelected[slot - 1].damage_change
          : 1;
      newChanges.charge_rate += newSelected[slot - 1].charge_rate;
      newChanges.charge_time += newSelected[slot - 1].charge_time;
      newChanges.guard_resistance += newSelected[slot - 1].guard_resistance;
      newChanges.guard_endurance += newSelected[slot - 1].guard_endurance;
      newChanges.blast_radius += newSelected[slot - 1].blast_radius;
    }

    setChanges(newChanges);
    setSelectedPerks(newSelected);
    setRender(!render);
  };

  useEffect(() => {
    checkEmpty();
  }, []);

  useEffect(() => {
    getWeaponData();
  }, []);

  return (
    <div className="d-flex flex-column align-content-start w-100">
      <div className="d-flex w-100 justify-content-center">
        <Form
          className="d-flex w-100 justify-content-center"
          onSubmit={searchCallBack}
        >
          <div className="w-50 border border-5 d-flex justify-content-center">
            <Form.Group className="flex-fill">
              <Form.Control
                type="text"
                id="weaponResults"
                aria-label="Form for entering a name of a weapon or perk"
                className="w-full"
                placeholder="Search for Weapon or Perk from current season"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <div>
              <FilterButton filterValue={getFilter}></FilterButton>
            </div>
            <Button as="input" type="submit" value="Search" />{" "}
          </div>
        </Form>
      </div>

      <div className="row w-100">
        <div className="col border border-5">
          <h1>Perks</h1>
          <div className="container">
            <div className="row">
              {Object.entries(perks).map(([slot, perks]) => (
                <div slot={slot} className="col border border-5">
                  <h4>Slot #{slot}</h4>
                  {perks.map((item, index) => (
                    <Image
                      style={{
                        backgroundColor:
                          selectedPerks[slot - 1] != item ? "black" : "blue",
                      }}
                      src={item.image_link}
                      className="w-100 my-1"
                      roundedCircle
                      onClick={(e) => handlePerkSelection(e, item, slot)}
                      alt={item.perk_name}
                    ></Image>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col flex-column border border-5">
          <div className="border border-5">
            <h1>Damage per Second</h1>
            <h4>
              Body Damage:{" "}
              {(weaponData.body_damage * changes.damage_change).toFixed(2)}
            </h4>
            <h4>
              Critical Damage:{" "}
              {(weaponData.crit_damage * changes.damage_change).toFixed(2)}
            </h4>
          </div>
        </div>
        <div className="col border border-5">
          <img src={weaponData.image_link} className="img-fluid"></img>
          <h1>{weaponData.weapon_name}</h1>
          <div className="border border-5">
            <h1>Weapon Information</h1>
            <h4>Weapon Type: {weaponData.weapon_type}</h4>
            <h4>Damage Type: {weaponData.damage_type}</h4>
            <h4>Ammo Type: {weaponData.ammo_type}</h4>
            <h4>Weapon Frame: {weaponData.weapon_frame}</h4>
          </div>
          <div className="border border-5">
            <h1>More Stats</h1>
            {weaponData.impact !== undefined ? (
              <h4>Impact: {weaponData.impact + changes.impact_change}</h4>
            ) : (
              <></>
            )}
            {weaponData.range !== undefined ? (
              <h4>Range: {weaponData.range + changes.range_change}</h4>
            ) : (
              <></>
            )}
            {weaponData.stability !== undefined ? (
              <h4>
                Stability: {weaponData.stability + changes.stability_change}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.handling !== undefined ? (
              <h4>Handling: {weaponData.handling + changes.handling_change}</h4>
            ) : (
              <></>
            )}
            {weaponData.reload_speed !== undefined ? (
              <h4>
                Reload Speed:{" "}
                {(weaponData.reload_speed + changes.reload_change) *
                  changes.reload_change_percentage}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.rpm !== undefined ? (
              <h4>Rounds per Minute: {weaponData.rpm + changes.rpm_change}</h4>
            ) : (
              <></>
            )}
            {weaponData.magazine ? (
              <h4>
                Magazine Size:{" "}
                {(weaponData.magazine + changes.magazine_change) *
                  changes.magazine_change_percentage}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.blast_radius !== undefined ? (
              <h4>
                Blast Radius: {weaponData.blast_radius + changes.blast_radius}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.velocity !== undefined ? (
              <h4>Velocity: {weaponData.velocity}</h4>
            ) : (
              <></>
            )}
            {weaponData.charge_time !== undefined ? (
              <h4>
                Charge Time: {weaponData.charge_time + changes.charge_time}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.burst !== undefined ? (
              <h4>Burst: {weaponData.burst}</h4>
            ) : (
              <></>
            )}
            {weaponData.swing_speed !== undefined ? (
              <h4>Swing Speed: {weaponData.swing_speed}</h4>
            ) : (
              <></>
            )}
            {weaponData.charge_rate !== undefined ? (
              <h4>
                Charge Rate: {weaponData.charge_rate + changes.charge_rate}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.guard_resistance !== undefined ? (
              <h4>
                Guard Resistance:{" "}
                {weaponData.guard_resistance + changes.guard_resistance}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.guard_endurance !== undefined ? (
              <h4>
                Guard Endurance:{" "}
                {weaponData.guard_endurance + changes.guard_endurance}
              </h4>
            ) : (
              <></>
            )}
            {weaponData.accuracy !== undefined ? (
              <h4>Accuracy: {weaponData.accuracy}</h4>
            ) : (
              <></>
            )}
            {weaponData.draw_time !== undefined ? (
              <h4>Draw Time: {weaponData.draw_time}</h4>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selector;
