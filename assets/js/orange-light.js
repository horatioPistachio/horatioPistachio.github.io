const FUEL_TYPES = {
    petrol: {
        label: "Petrol",
        energyDensityJoulesPerLiter: 33.8e6,
        description: "Petrol is calculated at 33.8 MJ/L."
    },
    diesel: {
        label: "Diesel",
        energyDensityJoulesPerLiter: 37.2e6,
        description: "Diesel is calculated at 37.2 MJ/L."
    }
};

const RED_LIGHT_TICKET_COST = 595;

function kmhToMs(speedKmh) {
    return speedKmh / 3.6;
}

function calculateStopCost({ carMass, carSpeedKmh, engineEfficiency, fuelType, fuelPricePerLiter }) {
    const selectedFuel = FUEL_TYPES[fuelType];
    const speedMs = kmhToMs(carSpeedKmh);
    const kineticEnergy = 0.5 * carMass * speedMs * speedMs;
    const fuelUsedLiters = kineticEnergy / (engineEfficiency * selectedFuel.energyDensityJoulesPerLiter);
    const fuelCost = fuelUsedLiters * fuelPricePerLiter;
    const ticketPayoffRuns = RED_LIGHT_TICKET_COST / fuelCost;
    const ticketPayoffRunsRoundedUp = Math.ceil(ticketPayoffRuns);

    return {
        speedMs,
        kineticEnergy,
        fuelUsedLiters,
        fuelCost,
        ticketPayoffRuns,
        ticketPayoffRunsRoundedUp,
        selectedFuel
    };
}

function formatNumber(value, options) {
    return new Intl.NumberFormat(undefined, options).format(value);
}

function formatEnergy(energyJoules) {
    if (energyJoules >= 1e6) {
        return `${formatNumber(energyJoules / 1e6, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} MJ`;
    }

    return `${formatNumber(energyJoules / 1e3, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })} kJ`;
}

function validateInputs(values) {
    const errors = {};

    if (!Number.isFinite(values.carMass) || values.carMass <= 0) {
        errors.carMass = "Enter a car mass greater than zero.";
    }

    if (!Number.isFinite(values.carSpeedKmh) || values.carSpeedKmh <= 0) {
        errors.carSpeed = "Enter a speed greater than zero.";
    }

    if (!Number.isFinite(values.engineEfficiency) || values.engineEfficiency <= 0 || values.engineEfficiency > 1) {
        errors.engineEfficiency = "Enter an efficiency between 0 and 1.";
    }

    if (!FUEL_TYPES[values.fuelType]) {
        errors.fuelType = "Choose a valid fuel type.";
    }

    if (!Number.isFinite(values.fuelPricePerLiter) || values.fuelPricePerLiter <= 0) {
        errors.fuelPrice = "Enter a fuel price greater than zero.";
    }

    return errors;
}

function getFormValues(form) {
    return {
        carMass: Number(form.carMass.value),
        carSpeedKmh: Number(form.carSpeed.value),
        engineEfficiency: Number(form.engineEfficiency.value),
        fuelType: form.fuelType.value,
        fuelPricePerLiter: Number(form.fuelPrice.value)
    };
}

function clearErrors() {
    document.querySelectorAll(".field-error").forEach((element) => {
        element.textContent = "";
    });
}

function renderErrors(errors) {
    clearErrors();

    Object.entries(errors).forEach(([fieldName, message]) => {
        const errorElement = document.getElementById(`${fieldName}Error`);

        if (errorElement) {
            errorElement.textContent = message;
        }
    });
}

function renderResult(calculation) {
    const ticketPayoffCount = formatNumber(calculation.ticketPayoffRunsRoundedUp, {
        maximumFractionDigits: 0
    });

    document.getElementById("resultValue").textContent = "$" + formatNumber(calculation.fuelCost, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById("resultNote").textContent = `${calculation.selectedFuel.label} requires approximately ${formatNumber(calculation.fuelUsedLiters, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    })} L to recreate ${formatEnergy(calculation.kineticEnergy)} of kinetic energy.`;
    document.getElementById("fuelUsedValue").textContent = `${formatNumber(calculation.fuelUsedLiters, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    })} L`;
    document.getElementById("kineticEnergyValue").textContent = formatEnergy(calculation.kineticEnergy);
    document.getElementById("speedMsValue").textContent = `${formatNumber(calculation.speedMs, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} m/s`;
    document.getElementById("ticketPayoffValue").textContent = `${ticketPayoffCount} times`;
    document.getElementById("ticketPayoffNote").textContent = `At the current settings, you would need to jump at least ${ticketPayoffCount} lights without getting caught to offset one $${formatNumber(RED_LIGHT_TICKET_COST, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })} ticket.`;
}

function updateFuelHint(fuelType) {
    const hint = document.getElementById("fuelTypeHint");
    hint.textContent = FUEL_TYPES[fuelType].description;
}

function initializeCalculator() {
    const form = document.getElementById("calculatorForm");
    const resetButton = document.getElementById("resetButton");

    if (!form || !resetButton) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = getFormValues(form);
        const errors = validateInputs(values);

        if (Object.keys(errors).length > 0) {
            renderErrors(errors);
            document.getElementById("resultValue").textContent = "Check the highlighted fields";
            document.getElementById("resultNote").textContent = "The calculator only runs when every required input is valid.";
            document.getElementById("fuelUsedValue").textContent = "-";
            document.getElementById("kineticEnergyValue").textContent = "-";
            document.getElementById("speedMsValue").textContent = "-";
            document.getElementById("ticketPayoffValue").textContent = "-";
            document.getElementById("ticketPayoffNote").textContent = "The ticket comparison is only available when every required input is valid.";
            return;
        }

        clearErrors();
        renderResult(calculateStopCost(values));
    });

    form.fuelType.addEventListener("change", () => {
        updateFuelHint(form.fuelType.value);
    });

    resetButton.addEventListener("click", () => {
        form.reset();
        clearErrors();
        updateFuelHint(form.fuelType.value);
        renderResult(calculateStopCost(getFormValues(form)));
    });

    updateFuelHint(form.fuelType.value);
    renderResult(calculateStopCost(getFormValues(form)));
}

initializeCalculator();