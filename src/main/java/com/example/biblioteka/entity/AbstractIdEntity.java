package com.example.biblioteka.entity;

import java.util.Objects;

public abstract class AbstractIdEntity {
    abstract Integer getId();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractIdEntity abstractIdEntity = (AbstractIdEntity) o;
        return getId() != null && Objects.equals(getId(), abstractIdEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
